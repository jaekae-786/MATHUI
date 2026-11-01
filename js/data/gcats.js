// G-CATS: the five MATHUI categories and the KSSM Add Math chapters inside each.
// Order of GCATS is the display order of the big letters: G C A T S.

export const GCATS = [
  {
    id: 'G',
    color: '#10b981',
    name: { en: 'Geometry', ms: 'Geometri' },
    // Formula the big letter morphs into during the 5-second intro.
    introTex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
    introText: 'd = √((x₂−x₁)² + (y₂−y₁)²)',
  },
  {
    id: 'C',
    color: '#3b82f6',
    name: { en: 'Calculus', ms: 'Kalkulus' },
    introTex: '\\frac{dy}{dx} \\quad \\int y\\,dx',
    introText: 'dy/dx   ∫ y dx',
  },
  {
    id: 'A',
    color: '#f59e0b',
    name: { en: 'Algebra', ms: 'Algebra' },
    introTex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
    introText: 'x = (−b ± √(b²−4ac)) / 2a',
  },
  {
    id: 'T',
    color: '#f43f5e',
    name: { en: 'Trigonometry', ms: 'Trigonometri' },
    introTex: '\\sin^2\\theta + \\cos^2\\theta = 1',
    introText: 'sin²θ + cos²θ = 1',
  },
  {
    id: 'S',
    color: '#8b5cf6',
    name: { en: 'Statistics', ms: 'Statistik' },
    introTex: 'P(X=r) = {}^{n}C_r\\, p^r q^{n-r}',
    introText: 'P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ',
  },
];

// KSSM Additional Mathematics chapters (Form 4 & Form 5) mapped to G-CATS.
export const CHAPTERS = [
  // G – Geometry
  { id: 'coord-geo', gcat: 'G', form: 4, name: { en: 'Coordinate Geometry', ms: 'Geometri Koordinat' } },
  { id: 'vectors', gcat: 'G', form: 4, name: { en: 'Vectors', ms: 'Vektor' } },
  { id: 'circular', gcat: 'G', form: 5, name: { en: 'Circular Measure', ms: 'Sukatan Membulat' } },
  // C – Calculus
  { id: 'diff', gcat: 'C', form: 5, name: { en: 'Differentiation', ms: 'Pembezaan' } },
  { id: 'integ', gcat: 'C', form: 5, name: { en: 'Integration', ms: 'Pengamiran' } },
  { id: 'kinematics', gcat: 'C', form: 5, name: { en: 'Kinematics of Linear Motion', ms: 'Kinematik Gerakan Linear' } },
  // A – Algebra
  { id: 'functions', gcat: 'A', form: 4, name: { en: 'Functions', ms: 'Fungsi' } },
  { id: 'quad-func', gcat: 'A', form: 4, name: { en: 'Quadratic Functions', ms: 'Fungsi Kuadratik' } },
  { id: 'sys-eq', gcat: 'A', form: 4, name: { en: 'Systems of Equations', ms: 'Sistem Persamaan' } },
  { id: 'indices-log', gcat: 'A', form: 4, name: { en: 'Indices, Surds and Logarithms', ms: 'Indeks, Surd dan Logaritma' } },
  { id: 'progressions', gcat: 'A', form: 4, name: { en: 'Progressions', ms: 'Janjang' } },
  { id: 'linear-law', gcat: 'A', form: 4, name: { en: 'Linear Law', ms: 'Hukum Linear' } },
  { id: 'lin-prog', gcat: 'A', form: 5, name: { en: 'Linear Programming', ms: 'Pengaturcaraan Linear' } },
  // T – Trigonometry
  { id: 'trig-func', gcat: 'T', form: 5, name: { en: 'Trigonometric Functions', ms: 'Fungsi Trigonometri' } },
  { id: 'triangles', gcat: 'T', form: 4, name: { en: 'Solution of Triangles', ms: 'Penyelesaian Segi Tiga' } },
  // S – Statistics
  { id: 'perm-comb', gcat: 'S', form: 5, name: { en: 'Permutation and Combination', ms: 'Pilih Atur dan Gabungan' } },
  { id: 'prob-dist', gcat: 'S', form: 5, name: { en: 'Probability Distribution', ms: 'Taburan Kebarangkalian' } },
  { id: 'index-num', gcat: 'S', form: 4, name: { en: 'Index Numbers', ms: 'Nombor Indeks' } },
];

export const gcatById = Object.fromEntries(GCATS.map((g) => [g.id, g]));
export const chapterById = Object.fromEntries(CHAPTERS.map((c) => [c.id, c]));
export const chaptersOf = (gcatId) => CHAPTERS.filter((c) => c.gcat === gcatId);
