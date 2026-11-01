// MATHUI question bank.
//
// ⚠ These are ORIGINAL SPM-style SAMPLE questions written for development.
// They follow the KSSM Add Math format but are NOT copied from real papers.
// Real past-year / trial questions are added in the same shape once the data
// pipeline (collect → OCR → split → tag) is running and copyright is cleared.
//
// Fields
//   id        unique id
//   source    'sample' | 'spm' | 'trial'
//   year      exam year (null for samples)
//   paper     'K1' (Kertas 1) | 'K2' (Kertas 2)
//   marks     total marks
//   chapter   chapter id (decides the G-CATS letter)
//   formulas  hand-checked "right formula(s)" (the detector's answer key)
//   text      { en, ms }
//   solution  null for now → premium (subscription) later

export const QUESTIONS = [
  // ───────────── G – GEOMETRY ─────────────
  {
    id: 'g-coord-1', source: 'sample', year: null, paper: 'K1', marks: 4, chapter: 'coord-geo',
    formulas: ['cg-midpoint', 'cg-distance'],
    text: {
      en: 'Points A(2, 3) and B(8, 11) lie on a Cartesian plane. Find (a) the midpoint of AB, (b) the distance between A and B.',
      ms: 'Titik A(2, 3) dan B(8, 11) terletak pada satah Cartes. Cari (a) titik tengah AB, (b) jarak antara A dan B.',
    },
    solution: null,
  },
  {
    id: 'g-coord-2', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'coord-geo',
    formulas: ['cg-divisor'],
    text: {
      en: 'Point P divides the line segment joining R(−1, 4) and S(9, −6) internally in the ratio 2 : 3. Find the coordinates of P.',
      ms: 'Titik P membahagi tembereng garis yang menyambungkan R(−1, 4) dan S(9, −6) secara dalam dengan nisbah 2 : 3. Cari koordinat P.',
    },
    solution: null,
  },
  {
    id: 'g-coord-3', source: 'sample', year: null, paper: 'K2', marks: 5, chapter: 'coord-geo',
    formulas: ['cg-locus'],
    text: {
      en: 'A point P moves such that its distance from A(1, 2) is always twice its distance from B(4, −1). Find the equation of the locus of P.',
      ms: 'Suatu titik P bergerak dengan keadaan jaraknya dari A(1, 2) sentiasa dua kali jaraknya dari B(4, −1). Cari persamaan lokus bagi P.',
    },
    solution: null,
  },
  {
    id: 'g-vec-1', source: 'sample', year: null, paper: 'K1', marks: 4, chapter: 'vectors',
    formulas: ['vec-triangle', 'vec-magnitude'],
    text: {
      en: 'Given OA = 3i + 4j and OB = 7i − 2j. Find (a) AB in terms of i and j, (b) the unit vector in the direction of AB.',
      ms: 'Diberi OA = 3i + 4j dan OB = 7i − 2j. Cari (a) AB dalam sebutan i dan j, (b) vektor unit dalam arah AB.',
    },
    solution: null,
  },
  {
    id: 'g-circ-1', source: 'sample', year: null, paper: 'K2', marks: 5, chapter: 'circular',
    formulas: ['circ-arc', 'circ-sector'],
    text: {
      en: 'The diagram shows a sector OPQ of a circle with centre O and radius 10 cm. Given ∠POQ = 1.2 radians, find (a) the length of the arc PQ, (b) the area of the sector OPQ.',
      ms: 'Rajah menunjukkan sektor OPQ bagi sebuah bulatan berpusat O dan berjejari 10 cm. Diberi ∠POQ = 1.2 radian, cari (a) panjang lengkok PQ, (b) luas sektor OPQ.',
    },
    solution: null,
  },

  // ───────────── C – CALCULUS ─────────────
  {
    id: 'c-diff-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'diff',
    formulas: ['diff-tangent'],
    text: {
      en: 'Find the equation of the tangent to the curve y = x³ − 4x + 1 at the point (2, 1).',
      ms: 'Cari persamaan tangen kepada lengkung y = x³ − 4x + 1 pada titik (2, 1).',
    },
    solution: null,
  },
  {
    id: 'c-diff-2', source: 'sample', year: null, paper: 'K2', marks: 6, chapter: 'diff',
    formulas: ['diff-turning'],
    text: {
      en: 'The curve y = 2x³ − 9x² + 12x has two turning points. Find the coordinates of the turning points and determine whether each is a maximum point or a minimum point.',
      ms: 'Lengkung y = 2x³ − 9x² + 12x mempunyai dua titik pusingan. Cari koordinat titik-titik pusingan itu dan tentukan sama ada setiap satu ialah titik maksimum atau titik minimum.',
    },
    solution: null,
  },
  {
    id: 'c-diff-3', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'diff',
    formulas: ['diff-rate'],
    text: {
      en: 'The radius of a circle increases at a rate of 0.2 cm s⁻¹. Find the rate of change of the area of the circle when the radius is 5 cm.',
      ms: 'Jejari sebuah bulatan bertambah dengan kadar 0.2 cm s⁻¹. Cari kadar perubahan luas bulatan itu apabila jejarinya ialah 5 cm.',
    },
    solution: null,
  },
  {
    id: 'c-diff-4', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'diff',
    formulas: ['diff-small-change'],
    text: {
      en: 'Given y = 3x² + 2x. Use differentiation to find the approximate change in y when x increases from 2 to 2.01.',
      ms: 'Diberi y = 3x² + 2x. Gunakan pembezaan untuk mencari perubahan hampir bagi y apabila x bertambah daripada 2 kepada 2.01.',
    },
    solution: null,
  },
  {
    id: 'c-integ-1', source: 'sample', year: null, paper: 'K2', marks: 5, chapter: 'integ',
    formulas: ['integ-area'],
    text: {
      en: 'The curve y = x² − 4x + 5 and the straight line y = 5 intersect at two points. Find the area of the region bounded by the curve and the straight line.',
      ms: 'Lengkung y = x² − 4x + 5 dan garis lurus y = 5 bersilang pada dua titik. Cari luas rantau yang dibatasi oleh lengkung dan garis lurus itu.',
    },
    solution: null,
  },
  {
    id: 'c-integ-2', source: 'sample', year: null, paper: 'K2', marks: 4, chapter: 'integ',
    formulas: ['integ-volume'],
    text: {
      en: 'The region bounded by the curve y = √x, the x-axis and the line x = 4 is revolved through 360° about the x-axis. Find the volume generated in terms of π.',
      ms: 'Rantau yang dibatasi oleh lengkung y = √x, paksi-x dan garis x = 4 dikisarkan melalui 360° pada paksi-x. Cari isi padu janaan dalam sebutan π.',
    },
    solution: null,
  },
  {
    id: 'c-kin-1', source: 'sample', year: null, paper: 'K2', marks: 6, chapter: 'kinematics',
    formulas: ['kinematics'],
    text: {
      en: 'A particle moves along a straight line and passes through a fixed point O. Its velocity, v m s⁻¹, is given by v = t² − 6t + 8, where t is the time in seconds after leaving O. Find (a) the times when the particle is momentarily at rest, (b) the acceleration of the particle when t = 4.',
      ms: 'Suatu zarah bergerak di sepanjang suatu garis lurus dan melalui satu titik tetap O. Halajunya, v m s⁻¹, diberi oleh v = t² − 6t + 8, dengan keadaan t ialah masa dalam saat selepas meninggalkan O. Cari (a) masa apabila zarah itu berhenti seketika, (b) pecutan zarah itu apabila t = 4.',
    },
    solution: null,
  },

  // ───────────── A – ALGEBRA ─────────────
  {
    id: 'a-fn-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'functions',
    formulas: ['fn-inverse'],
    text: {
      en: 'Given the function f(x) = (3x + 2)/(x − 1), x ≠ 1. Find the inverse function f⁻¹(x).',
      ms: 'Diberi fungsi f(x) = (3x + 2)/(x − 1), x ≠ 1. Cari fungsi songsang f⁻¹(x).',
    },
    solution: null,
  },
  {
    id: 'a-quad-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'quad-func',
    formulas: ['quad-formula'],
    text: {
      en: 'Solve the quadratic equation 2x² − 5x − 4 = 0. Give your answer correct to four decimal places.',
      ms: 'Selesaikan persamaan kuadratik 2x² − 5x − 4 = 0. Beri jawapan betul kepada empat tempat perpuluhan.',
    },
    solution: null,
  },
  {
    id: 'a-quad-2', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'quad-func',
    formulas: ['quad-discriminant'],
    text: {
      en: 'The quadratic equation x² + (k − 2)x + 9 = 0 has two equal roots. Find the possible values of k.',
      ms: 'Persamaan kuadratik x² + (k − 2)x + 9 = 0 mempunyai dua punca yang sama. Cari nilai-nilai yang mungkin bagi k.',
    },
    solution: null,
  },
  {
    id: 'a-sys-1', source: 'sample', year: null, paper: 'K2', marks: 5, chapter: 'sys-eq',
    formulas: ['sys-eq'],
    text: {
      en: 'Solve the simultaneous equations x + 2y = 7 and x² + y² = 13.',
      ms: 'Selesaikan persamaan serentak x + 2y = 7 dan x² + y² = 13.',
    },
    solution: null,
  },
  {
    id: 'a-log-1', source: 'sample', year: null, paper: 'K1', marks: 4, chapter: 'indices-log',
    formulas: ['log-laws'],
    text: {
      en: 'Solve the equation log₂ (x + 3) − log₂ (x − 1) = 2.',
      ms: 'Selesaikan persamaan log₂ (x + 3) − log₂ (x − 1) = 2.',
    },
    solution: null,
  },
  {
    id: 'a-prog-1', source: 'sample', year: null, paper: 'K2', marks: 6, chapter: 'progressions',
    formulas: ['ap-term', 'ap-sum'],
    text: {
      en: 'The 3rd term of an arithmetic progression is 11 and the 8th term is 31. Find (a) the first term and the common difference, (b) the sum of the first 20 terms.',
      ms: 'Sebutan ke-3 suatu janjang aritmetik ialah 11 dan sebutan ke-8 ialah 31. Cari (a) sebutan pertama dan beza sepunya, (b) hasil tambah 20 sebutan pertama.',
    },
    solution: null,
  },
  {
    id: 'a-prog-2', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'progressions',
    formulas: ['gp-sum-inf'],
    text: {
      en: 'The first term of a geometric progression is 54 and the common ratio is 1/3. Find the sum to infinity of the progression.',
      ms: 'Sebutan pertama suatu janjang geometri ialah 54 dan nisbah sepunya ialah 1/3. Cari hasil tambah hingga ketakterhinggaan janjang itu.',
    },
    solution: null,
  },
  {
    id: 'a-law-1', source: 'sample', year: null, paper: 'K2', marks: 8, chapter: 'linear-law',
    formulas: ['linear-law'],
    text: {
      en: 'The variables x and y are related by the equation y = px² + qx. A straight line graph is obtained by plotting y/x against x. Draw the line of best fit and hence find the values of p and q.',
      ms: 'Pemboleh ubah x dan y dihubungkan oleh persamaan y = px² + qx. Satu graf garis lurus diperoleh dengan memplot y/x melawan x. Lukis garis lurus penyuaian terbaik dan seterusnya cari nilai p dan q.',
    },
    solution: null,
  },
  {
    id: 'a-lp-1', source: 'sample', year: null, paper: 'K2', marks: 8, chapter: 'lin-prog',
    formulas: ['lin-prog'],
    text: {
      en: 'A factory produces x units of product A and y units of product B. The production is subject to the constraints x + y ≤ 80, 2x + y ≤ 120 and y ≥ 10. Shade the region R that satisfies all the constraints and find the maximum profit if the objective function is k = 40x + 30y.',
      ms: 'Sebuah kilang menghasilkan x unit produk A dan y unit produk B. Pengeluaran tertakluk kepada kekangan x + y ≤ 80, 2x + y ≤ 120 dan y ≥ 10. Lorek rantau R yang memuaskan semua kekangan dan cari keuntungan maksimum jika fungsi objektif ialah k = 40x + 30y.',
    },
    solution: null,
  },

  // ───────────── T – TRIGONOMETRY ─────────────
  {
    id: 't-trig-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'trig-func',
    formulas: ['trig-identity', 'trig-double'],
    text: {
      en: 'Prove that tan x + cot x = 2 cosec 2x.',
      ms: 'Buktikan bahawa tan x + kot x = 2 kosek 2x.',
    },
    solution: null,
  },
  {
    id: 't-trig-2', source: 'sample', year: null, paper: 'K2', marks: 6, chapter: 'trig-func',
    formulas: ['trig-graph'],
    text: {
      en: 'Sketch the graph of y = 2 sin 2x for 0 ≤ x ≤ 2π. Hence, find the number of solutions of the equation 2 sin 2x = x/π for 0 ≤ x ≤ 2π.',
      ms: 'Lakar graf y = 2 sin 2x untuk 0 ≤ x ≤ 2π. Seterusnya, cari bilangan penyelesaian bagi persamaan 2 sin 2x = x/π untuk 0 ≤ x ≤ 2π.',
    },
    solution: null,
  },
  {
    id: 't-trig-3', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'trig-func',
    formulas: ['trig-compound'],
    text: {
      en: 'Given sin A = 3/5 and cos B = 5/13, where A and B are acute angles. Without using a calculator, find the value of sin (A + B).',
      ms: 'Diberi sin A = 3/5 dan kos B = 5/13, dengan keadaan A dan B ialah sudut tirus. Tanpa menggunakan kalkulator, cari nilai sin (A + B).',
    },
    solution: null,
  },
  {
    id: 't-tri-1', source: 'sample', year: null, paper: 'K2', marks: 3, chapter: 'triangles',
    formulas: ['tri-sine-rule'],
    text: {
      en: 'In triangle PQR, PQ = 8 cm, ∠PQR = 40° and ∠QPR = 75°. Calculate the length of QR.',
      ms: 'Dalam segi tiga PQR, PQ = 8 cm, ∠PQR = 40° dan ∠QPR = 75°. Hitung panjang QR.',
    },
    solution: null,
  },
  {
    id: 't-tri-2', source: 'sample', year: null, paper: 'K2', marks: 5, chapter: 'triangles',
    formulas: ['tri-cosine-rule', 'tri-area'],
    text: {
      en: 'In triangle ABC, AB = 7 cm, BC = 5 cm and AC = 9 cm. Find (a) ∠ABC, (b) the area of triangle ABC.',
      ms: 'Dalam segi tiga ABC, AB = 7 cm, BC = 5 cm dan AC = 9 cm. Cari (a) ∠ABC, (b) luas segi tiga ABC.',
    },
    solution: null,
  },

  // ───────────── S – STATISTICS ─────────────
  {
    id: 's-perm-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'perm-comb',
    formulas: ['perm'],
    text: {
      en: 'Find the number of ways the letters of the word MATHUI can be arranged in a row if the vowels must be next to each other.',
      ms: 'Cari bilangan cara huruf-huruf daripada perkataan MATHUI boleh disusun dalam satu baris jika huruf vokal mesti bersebelahan.',
    },
    solution: null,
  },
  {
    id: 's-comb-1', source: 'sample', year: null, paper: 'K1', marks: 3, chapter: 'perm-comb',
    formulas: ['comb'],
    text: {
      en: 'A committee of 5 members is to be selected from 6 boys and 4 girls. Find the number of different committees that can be formed if the committee must have at least 2 girls.',
      ms: 'Sebuah jawatankuasa yang terdiri daripada 5 ahli akan dipilih daripada 6 lelaki dan 4 perempuan. Cari bilangan jawatankuasa berlainan yang boleh dibentuk jika jawatankuasa itu mesti mempunyai sekurang-kurangnya 2 perempuan.',
    },
    solution: null,
  },
  {
    id: 's-prob-1', source: 'sample', year: null, paper: 'K2', marks: 4, chapter: 'prob-dist',
    formulas: ['binom'],
    text: {
      en: 'In a school, 30% of the students cycle to school. If 8 students are chosen at random, find the probability that exactly 3 of them cycle to school.',
      ms: 'Di sebuah sekolah, 30% daripada murid berbasikal ke sekolah. Jika 8 orang murid dipilih secara rawak, cari kebarangkalian bahawa tepat 3 orang daripada mereka berbasikal ke sekolah.',
    },
    solution: null,
  },
  {
    id: 's-prob-2', source: 'sample', year: null, paper: 'K2', marks: 4, chapter: 'prob-dist',
    formulas: ['normal-z'],
    text: {
      en: 'The masses of durians from an orchard are normally distributed with a mean of 1.8 kg and a standard deviation of 0.3 kg. Find the probability that a durian chosen at random has a mass of more than 2.1 kg.',
      ms: 'Jisim durian dari sebuah dusun adalah bertaburan secara normal dengan min 1.8 kg dan sisihan piawai 0.3 kg. Cari kebarangkalian bahawa sebiji durian yang dipilih secara rawak mempunyai jisim lebih daripada 2.1 kg.',
    },
    solution: null,
  },
  {
    id: 's-idx-1', source: 'sample', year: null, paper: 'K1', marks: 2, chapter: 'index-num',
    formulas: ['idx-num'],
    text: {
      en: 'The price of a kilogram of rice was RM2.50 in the year 2020 and RM3.00 in the year 2024. Using 2020 as the base year, calculate the price index of rice in the year 2024.',
      ms: 'Harga sekilogram beras ialah RM2.50 pada tahun 2020 dan RM3.00 pada tahun 2024. Menggunakan tahun 2020 sebagai tahun asas, hitung indeks harga beras pada tahun 2024.',
    },
    solution: null,
  },
];

export const questionById = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
