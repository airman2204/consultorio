-- Extensiones necesarias
create extension if not exists "pgcrypto";

-- 1. Tutores / Padres
create table if not exists public.tutors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp text not null unique,
  email text,
  created_at timestamptz not null default now()
);

-- 2. Pacientes (Bebés / Niños - NOM-004)
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutors(id) on delete cascade,
  full_name text not null,
  birth_date date not null,
  sex text check (sex in ('M', 'F')),
  allergies text not null default 'Ninguna conocida',
  perinatal_history jsonb default '{}'::jsonb,
  vaccines_history jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- 3. Bloques Ocupados Externos (Caché de lectura de TimeTree)
create table if not exists public.timetree_busy_blocks (
  id uuid primary key default gen_random_uuid(),
  external_event_id text unique,
  title text default 'Horario Ocupado - Consultorio Compartido',
  start_time timestamptz not null,
  end_time timestamptz not null,
  synced_at timestamptz not null default now()
);

-- 4. Citas (Sincronizadas con TimeTree + WhatsApp)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutors(id) on delete restrict,
  patient_id uuid references public.patients(id) on delete set null,
  service_stage text not null check (service_stage in ('recien_nacido', 'lactantes', 'infancia', 'urgencia')),
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  timetree_synced boolean not null default false,
  whatsapp_notified boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

-- Evita doble reserva solo si la cita sigue activa
create unique index if not exists unique_active_appointment_slot 
  on public.appointments (start_time) 
  where status in ('pending', 'confirmed', 'completed');

-- 5. Descargas de Lead Magnets
create table if not exists public.lead_magnets (
  id uuid primary key default gen_random_uuid(),
  tutor_name text not null,
  whatsapp text not null,
  baby_birth_date date not null,
  resource_slug text not null,
  created_at timestamptz not null default now()
);

-- 6. Notas Clínicas SOAP & Somatometría (Fase 2 - NOM-004-SSA3-2012)
create table if not exists public.clinical_notes (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  weight_kg numeric(5,2),
  height_cm numeric(5,2),
  head_circumference_cm numeric(5,2),
  temperature_c numeric(4,2),
  subjective text,
  objective text,
  assessment text,
  plan text,
  prescription_data jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Activar RLS
alter table public.tutors enable row level security;
alter table public.patients enable row level security;
alter table public.timetree_busy_blocks enable row level security;
alter table public.appointments enable row level security;
alter table public.lead_magnets enable row level security;
alter table public.clinical_notes enable row level security;

-- Políticas para el Dashboard Médico (Solo usuarios autenticados)
create policy "Doctora acceso total tutors" on public.tutors for all to authenticated using (true) with check (true);
create policy "Doctora acceso total patients" on public.patients for all to authenticated using (true) with check (true);
create policy "Doctora acceso total timetree" on public.timetree_busy_blocks for all to authenticated using (true) with check (true);
create policy "Doctora acceso total appointments" on public.appointments for all to authenticated using (true) with check (true);
create policy "Doctora acceso total lead_magnets" on public.lead_magnets for all to authenticated using (true) with check (true);
create policy "Doctora acceso total clinical_notes" on public.clinical_notes for all to authenticated using (true) with check (true);

-- Lectura pública controlada de horarios ocupados para el calendario web
create policy "Lectura publica bloques ocupados" on public.timetree_busy_blocks for select to anon using (true);
