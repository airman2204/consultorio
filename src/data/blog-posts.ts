export interface BlogPost {
  slug: string;
  title: string;
  category: 'Fiebre y Urgencias' | 'Alimentación' | 'Recién Nacido' | 'Vacunas';
  readTime: string;
  date: string;
  excerpt: string;
  accentColor: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  calloutTitle: string;
  calloutItems: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '3-senales-alarma-fiebre-infantil',
    title: '3 Señales de Alarma en Fiebre Infantil que todo papá debe conocer',
    category: 'Fiebre y Urgencias',
    readTime: '4 min',
    date: '12 May 2025',
    excerpt:
      'La fiebre es una respuesta natural de defensa, pero saber cuándo acudir a valoración marca la diferencia. Aprende a identificar los signos clave.',
    accentColor: '#E5C0C8',
    sections: [
      {
        heading: '1. Fiebre en menores de 3 meses',
        paragraphs: [
          'En recién nacidos y lactantes menores de 3 meses, cualquier temperatura rectal o axilar igual o mayor a 38.0 °C requiere valoración médica inmediata, incluso si el bebé parece tranquilo.',
          'Su sistema inmunológico aún está en maduración, por lo que es fundamental descartar infecciones bacterianas a tiempo sin automedicar.',
        ],
      },
      {
        heading: '2. Cambios en el comportamiento o estado de alerta',
        paragraphs: [
          'Más allá del número en el termómetro, observa cómo se comporta tu pequeño cuando baja la fiebre: si está muy somnoliento, irritable sin consuelo, rechaza líquidos o respira con dificultad, es momento de acudir a consulta.',
        ],
      },
      {
        heading: '3. Fiebre persistente por más de 48 horas',
        paragraphs: [
          'La mayoría de los cuadros virales comienzan a ceder entre las 48 y 72 horas. Si la fiebre continúa subiendo o aparecen ronchas, dolor de oído o vómitos repetidos, agenda una revisión en consultorio.',
        ],
      },
    ],
    calloutTitle: '¿Cuándo acudir de inmediato al Hospital MAC?',
    calloutItems: [
      'Bebé menor de 3 meses con temperatura ≥ 38.0 °C.',
      'Dificultad para respirar o hundimiento de costillas.',
      'Labios morados, manchas rojas que no desaparecen al presionar o convulsiones.',
      'Llanto inconsolable o rechazo total de alimento/líquidos.',
    ],
  },
  {
    slug: 'guia-alimentacion-complementaria',
    title: 'Guía de Alimentación Complementaria: cuándo y cómo iniciar',
    category: 'Alimentación',
    readTime: '6 min',
    date: '28 Abr 2025',
    excerpt:
      'Señales de preparación a los 6 meses, texturas seguras y cómo introducir alimentos potencialmente alergénicos sin estrés.',
    accentColor: '#C7D5B8',
    sections: [
      {
        heading: '1. Señales de que tu bebé está listo',
        paragraphs: [
          'Alrededor de los 6 meses, tu bebé debe poder mantenerse sentado con mínimo apoyo, sostener bien su cabeza, mostrar interés activo por la comida y haber perdido el reflejo de extrusión (empujar todo con la lengua).',
        ],
      },
      {
        heading: '2. Papillas, BLW o método mixto',
        paragraphs: [
          'No existe un único método perfecto. Tanto las papillas machacadas como el Baby-Led Weaning (trozos seguros del tamaño de un dedo adulto) son válidos si se respetan las texturas blandas y se evita la sal o azúcar añadida antes del año.',
        ],
      },
      {
        heading: '3. Introducción temprana de alérgenos',
        paragraphs: [
          'La evidencia actual respalda ofrecer huevo bien cocido, cacahuate en crema diluida o pescado de forma temprana y uno a la vez, observando tolerancia durante 2 a 3 días.',
        ],
      },
    ],
    calloutTitle: 'Alimentos que debes evitar antes del primer año',
    calloutItems: [
      'Miel de abeja (riesgo de botulismo infantil).',
      'Leche entera de vaca como bebida principal.',
      'Sal, azúcar añadida, jugos y ultraprocesados.',
      'Alimentos duros o redondos enteros (uvas, nueces, palomitas).',
    ],
  },
  {
    slug: 'primeros-cuidados-recien-nacido',
    title: 'Primeros cuidados del recién nacido en casa',
    category: 'Recién Nacido',
    readTime: '5 min',
    date: '15 Abr 2025',
    excerpt:
      'Del cordón umbilical al sueño seguro y las primeras visitas de control de niño sano: todo lo que necesitas para tus primeras semanas.',
    accentColor: '#E0C9A6',
    sections: [
      {
        heading: '1. Cuidado del cordón umbilical',
        paragraphs: [
          'Mantén el muñón umbilical limpio y seco, doblando el pañal por debajo para evitar humedad. Suele caer por sí solo entre los 7 y 15 días de vida.',
        ],
      },
      {
        heading: '2. Sueño seguro boca arriba',
        paragraphs: [
          'Acuesta siempre a tu bebé boca arriba sobre un colchón firme, sin almohadas, cobijas sueltas ni peluches dentro de la cuna.',
        ],
      },
      {
        heading: '3. Tu primera consulta pediátrica',
        paragraphs: [
          'La primera revisión idealmente ocurre entre los 3 y 5 días posteriores al alta hospitalaria para evaluar peso, ictericia, lactancia y tamiz neonatal.',
        ],
      },
    ],
    calloutTitle: 'Checklist básico de las primeras 2 semanas',
    calloutItems: [
      '6 o más pañales mojados al día a partir del 5.º día.',
      'Tamiz metabólico y tamiz auditivo realizados.',
      'Vacuna BCG y Hepatitis B aplicadas al nacimiento.',
      'Primera cita de Control de Niño Sano agendada.',
    ],
  },
];
