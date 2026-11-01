// MATHUI formula bank for SPM Additional Mathematics (KSSM).
//
// Each formula carries the keywords (English + Bahasa Melayu) that "trigger" it.
// The detector (js/detector.js) scans a question for these keywords and
// suggests the formula(s) and the G-CATS category.
//
// Fields
//   id        unique id, referenced by questions and keywords
//   chapter   chapter id from gcats.js (the chapter decides the G-CATS letter)
//   name      { en, ms }
//   tex       LaTeX for KaTeX rendering
//   text      plain-text fallback
//   onSheet   true if the formula is printed on the official SPM formula page (Rumus)
//   kw        { en: [...], ms: [...] } trigger keywords. A keyword is either a
//             string (weight 2) or [phrase, weight]. Weight 1 = weak hint,
//             3-4 = very strong signal. Matching is case-insensitive.

export const FORMULAS = [
  // ───────────────────────────── A – ALGEBRA ─────────────────────────────
  {
    id: 'fn-inverse', chapter: 'functions', onSheet: false,
    name: { en: 'Inverse function', ms: 'Fungsi songsang' },
    tex: 'f(x) = y \\iff f^{-1}(y) = x', text: 'f(x) = y ⇔ f⁻¹(y) = x',
    kw: { en: [['inverse function', 3], 'f⁻¹'], ms: [['fungsi songsang', 3], 'f⁻¹'] },
  },
  {
    id: 'fn-composite', chapter: 'functions', onSheet: false,
    name: { en: 'Composite function', ms: 'Fungsi gubahan' },
    tex: 'fg(x) = f\\big(g(x)\\big)', text: 'fg(x) = f(g(x))',
    kw: { en: [['composite function', 3]], ms: [['fungsi gubahan', 3]] },
  },
  {
    id: 'quad-formula', chapter: 'quad-func', onSheet: true,
    name: { en: 'Quadratic formula', ms: 'Rumus kuadratik' },
    tex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}', text: 'x = (−b ± √(b² − 4ac)) / 2a',
    kw: {
      en: ['quadratic equation', ['four decimal places', 3], ['decimal places', 1]],
      ms: ['persamaan kuadratik', ['empat tempat perpuluhan', 3], ['tempat perpuluhan', 1]],
    },
  },
  {
    id: 'quad-discriminant', chapter: 'quad-func', onSheet: false,
    name: { en: 'Discriminant (types of roots)', ms: 'Pembezalayan (jenis punca)' },
    tex: 'b^2-4ac > 0,\\; = 0,\\; < 0', text: 'b² − 4ac > 0, = 0, < 0',
    kw: {
      en: [['equal roots', 3], ['two distinct roots', 3], ['two different roots', 3], ['real roots', 3],
        ['no real roots', 3], ['touches the x-axis', 3], ['does not intersect the x-axis', 3], ['discriminant', 3]],
      ms: [['punca yang sama', 3], ['punca sama', 3], ['dua punca berbeza', 3], ['punca nyata', 3],
        ['tiada punca nyata', 3], ['menyentuh paksi-x', 3], ['tidak menyilang paksi-x', 3], ['pembezalayan', 3]],
    },
  },
  {
    id: 'quad-roots', chapter: 'quad-func', onSheet: false,
    name: { en: 'Sum and product of roots', ms: 'Hasil tambah dan hasil darab punca' },
    tex: '\\alpha+\\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}', text: 'α + β = −b/a,  αβ = c/a',
    kw: {
      en: [['sum of roots', 3], ['product of roots', 3], ['α and β', 2]],
      ms: [['hasil tambah punca', 3], ['hasil darab punca', 3], ['α dan β', 2]],
    },
  },
  {
    id: 'quad-vertex', chapter: 'quad-func', onSheet: false,
    name: { en: 'Vertex form (completing the square)', ms: 'Bentuk verteks (penyempurnaan kuasa dua)' },
    tex: 'f(x) = a(x-h)^2 + k', text: 'f(x) = a(x − h)² + k',
    kw: {
      en: [['completing the square', 3], ['axis of symmetry', 3], ['quadratic function', 2]],
      ms: [['penyempurnaan kuasa dua', 3], ['paksi simetri', 3], ['fungsi kuadratik', 2]],
    },
  },
  {
    id: 'sys-eq', chapter: 'sys-eq', onSheet: false,
    name: { en: 'Simultaneous equations (substitution)', ms: 'Persamaan serentak (penggantian)' },
    tex: 'x = \\ldots \\;\\Rightarrow\\; \\text{substitute into the other equation}',
    text: 'Make x (or y) the subject → substitute into the other equation',
    kw: {
      en: [['simultaneous equations', 3], ['system of linear equations', 3], ['three linear equations', 3]],
      ms: [['persamaan serentak', 3], ['sistem persamaan linear', 3], ['tiga persamaan linear', 3]],
    },
  },
  {
    id: 'idx-laws', chapter: 'indices-log', onSheet: true,
    name: { en: 'Laws of indices', ms: 'Hukum indeks' },
    tex: 'a^m \\times a^n = a^{m+n},\\; a^m \\div a^n = a^{m-n},\\; (a^m)^n = a^{mn}',
    text: 'aᵐ × aⁿ = aᵐ⁺ⁿ,  aᵐ ÷ aⁿ = aᵐ⁻ⁿ,  (aᵐ)ⁿ = aᵐⁿ',
    kw: { en: ['indices', 'index form', 'surd', 'surds'], ms: ['indeks', 'bentuk indeks', 'surd'] },
  },
  {
    id: 'log-laws', chapter: 'indices-log', onSheet: true,
    name: { en: 'Laws of logarithms', ms: 'Hukum logaritma' },
    tex: '\\log_a mn = \\log_a m + \\log_a n,\\; \\log_a \\tfrac{m}{n} = \\log_a m - \\log_a n,\\; \\log_a m^n = n\\log_a m',
    text: 'logₐ mn = logₐ m + logₐ n,  logₐ (m/n) = logₐ m − logₐ n,  logₐ mⁿ = n logₐ m',
    kw: { en: [['log', 3], ['logarithm', 3], ['logarithms', 3]], ms: [['log', 3], ['logaritma', 3]] },
  },
  {
    id: 'log-base', chapter: 'indices-log', onSheet: true,
    name: { en: 'Change of base', ms: 'Penukaran asas' },
    tex: '\\log_a b = \\frac{\\log_c b}{\\log_c a}', text: 'logₐ b = log꜀ b / log꜀ a',
    kw: { en: [['change of base', 3], ['different bases', 2]], ms: [['penukaran asas', 3], ['tukar asas', 3]] },
  },
  {
    id: 'ap-term', chapter: 'progressions', onSheet: true,
    name: { en: 'nth term of an AP', ms: 'Sebutan ke-n JA' },
    tex: 'T_n = a + (n-1)d', text: 'Tₙ = a + (n − 1)d',
    kw: {
      en: [['arithmetic progression', 3], ['common difference', 3], ['nth term', 1]],
      ms: [['janjang aritmetik', 3], ['beza sepunya', 3], ['sebutan ke-n', 1]],
    },
  },
  {
    id: 'ap-sum', chapter: 'progressions', onSheet: true,
    name: { en: 'Sum of first n terms of an AP', ms: 'Hasil tambah n sebutan pertama JA' },
    tex: 'S_n = \\frac{n}{2}\\left[2a + (n-1)d\\right]', text: 'Sₙ = n/2 [2a + (n − 1)d]',
    kw: { en: [['arithmetic progression', 1], ['sum of the first', 2]], ms: [['janjang aritmetik', 1], ['sebutan pertama', 1]] },
  },
  {
    id: 'gp-term', chapter: 'progressions', onSheet: true,
    name: { en: 'nth term of a GP', ms: 'Sebutan ke-n JG' },
    tex: 'T_n = ar^{n-1}', text: 'Tₙ = arⁿ⁻¹',
    kw: {
      en: [['geometric progression', 3], ['common ratio', 3], ['nth term', 1]],
      ms: [['janjang geometri', 3], ['nisbah sepunya', 3], ['sebutan ke-n', 1]],
    },
  },
  {
    id: 'gp-sum', chapter: 'progressions', onSheet: true,
    name: { en: 'Sum of first n terms of a GP', ms: 'Hasil tambah n sebutan pertama JG' },
    tex: 'S_n = \\frac{a(r^n-1)}{r-1} = \\frac{a(1-r^n)}{1-r},\\; r \\neq 1',
    text: 'Sₙ = a(rⁿ − 1)/(r − 1) = a(1 − rⁿ)/(1 − r), r ≠ 1',
    kw: { en: [['geometric progression', 1], ['sum of the first', 2]], ms: [['janjang geometri', 1], ['sebutan pertama', 1]] },
  },
  {
    id: 'gp-sum-inf', chapter: 'progressions', onSheet: true,
    name: { en: 'Sum to infinity of a GP', ms: 'Hasil tambah hingga ketakterhinggaan JG' },
    tex: 'S_\\infty = \\frac{a}{1-r},\\; |r| < 1', text: 'S∞ = a / (1 − r), |r| < 1',
    kw: { en: [['sum to infinity', 4], ['recurring decimal', 3]], ms: [['ketakterhinggaan', 4], ['perpuluhan jadi semula', 3]] },
  },
  {
    id: 'linear-law', chapter: 'linear-law', onSheet: false,
    name: { en: 'Linear law (reduce to Y = mX + c)', ms: 'Hukum linear (tukar kepada Y = mX + c)' },
    tex: 'Y = mX + c', text: 'Y = mX + c',
    kw: {
      en: [['line of best fit', 4], ['linear law', 3], ['straight line graph', 2], ['plotting', 1], ['non-linear', 2]],
      ms: [['garis lurus penyuaian terbaik', 4], ['hukum linear', 3], ['graf garis lurus', 2], ['memplot', 1], ['tak linear', 2]],
    },
  },
  {
    id: 'lin-prog', chapter: 'lin-prog', onSheet: false,
    name: { en: 'Objective function', ms: 'Fungsi objektif' },
    tex: 'k = ax + by', text: 'k = ax + by',
    kw: {
      en: [['linear programming', 3], ['objective function', 4], ['constraints', 3], ['constraint', 3], ['region r', 2], ['feasible region', 3]],
      ms: [['pengaturcaraan linear', 3], ['fungsi objektif', 4], ['kekangan', 3], ['rantau r', 2], ['rantau tersaur', 3]],
    },
  },

  // ───────────────────────────── C – CALCULUS ─────────────────────────────
  {
    id: 'diff-power', chapter: 'diff', onSheet: false,
    name: { en: 'Differentiation of axⁿ', ms: 'Pembezaan axⁿ' },
    tex: '\\frac{d}{dx}(ax^n) = anx^{n-1}', text: 'd/dx (axⁿ) = anxⁿ⁻¹',
    kw: {
      en: ['differentiate', ['differentiation', 1], 'derivative', 'first derivative', 'dy/dx', ['gradient function', 2]],
      ms: ['bezakan', ['pembezaan', 1], 'terbitan', 'terbitan pertama', 'dy/dx', ['fungsi kecerunan', 2]],
    },
  },
  {
    id: 'diff-rules', chapter: 'diff', onSheet: true,
    name: { en: 'Product, quotient & chain rule', ms: 'Petua hasil darab, hasil bahagi & rantai' },
    tex: '\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx},\\; \\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2},\\; \\frac{dy}{dx} = \\frac{dy}{du}\\times\\frac{du}{dx}',
    text: 'd(uv)/dx = u dv/dx + v du/dx;  d(u/v)/dx = (v du/dx − u dv/dx)/v²;  dy/dx = dy/du × du/dx',
    kw: {
      en: [['product rule', 3], ['quotient rule', 3], ['chain rule', 3]],
      ms: [['petua hasil darab', 3], ['petua hasil bahagi', 3], ['petua rantai', 3]],
    },
  },
  {
    id: 'diff-tangent', chapter: 'diff', onSheet: false,
    name: { en: 'Tangent & normal', ms: 'Tangen & normal' },
    tex: 'm_{\\text{tangent}} = \\frac{dy}{dx},\\; m_{\\text{normal}} = -\\frac{1}{m_{\\text{tangent}}},\\; y - y_1 = m(x - x_1)',
    text: 'm(tangent) = dy/dx,  m(normal) = −1/m(tangent),  y − y₁ = m(x − x₁)',
    kw: {
      en: [['gradient of the tangent', 4], ['equation of the tangent', 4], ['equation of the normal', 4], ['tangent to the curve', 3], ['normal to the curve', 3]],
      ms: [['kecerunan tangen', 4], ['persamaan tangen', 4], ['persamaan normal', 4], ['tangen kepada lengkung', 3], ['normal kepada lengkung', 3]],
    },
  },
  {
    id: 'diff-turning', chapter: 'diff', onSheet: false,
    name: { en: 'Turning points (max / min)', ms: 'Titik pusingan (maks / min)' },
    tex: '\\frac{dy}{dx} = 0;\\; \\frac{d^2y}{dx^2} > 0 \\Rightarrow \\text{min},\\; \\frac{d^2y}{dx^2} < 0 \\Rightarrow \\text{max}',
    text: 'dy/dx = 0;  d²y/dx² > 0 → minimum,  d²y/dx² < 0 → maximum',
    kw: {
      en: [['turning point', 4], ['turning points', 4], ['stationary point', 4], ['maximum point', 3], ['minimum point', 3],
        ['maximum value', 2], ['minimum value', 2], ['second derivative', 3]],
      ms: [['titik pusingan', 4], ['titik-titik pusingan', 4], ['titik pegun', 4], ['titik maksimum', 3], ['titik minimum', 3],
        ['nilai maksimum', 2], ['nilai minimum', 2], ['terbitan kedua', 3]],
    },
  },
  {
    id: 'diff-rate', chapter: 'diff', onSheet: false,
    name: { en: 'Rates of change', ms: 'Kadar perubahan' },
    tex: '\\frac{dy}{dt} = \\frac{dy}{dx} \\times \\frac{dx}{dt}', text: 'dy/dt = dy/dx × dx/dt',
    kw: {
      en: [['rate of change', 4], ['increases at a rate', 4], ['decreases at a rate', 4], ['rate of increase', 3], ['rate of decrease', 3]],
      ms: [['kadar perubahan', 4], ['bertambah dengan kadar', 4], ['berkurang dengan kadar', 4], ['kadar pertambahan', 3], ['kadar penyusutan', 3]],
    },
  },
  {
    id: 'diff-small-change', chapter: 'diff', onSheet: false,
    name: { en: 'Small changes & approximation', ms: 'Perubahan kecil & penghampiran' },
    tex: '\\delta y \\approx \\frac{dy}{dx} \\times \\delta x', text: 'δy ≈ dy/dx × δx',
    kw: {
      en: [['small change', 4], ['approximate change', 4], ['approximate value', 3], ['small increase', 3], ['percentage change', 3]],
      ms: [['perubahan kecil', 4], ['perubahan hampir', 4], ['nilai hampir', 3], ['tokokan kecil', 3], ['peratus perubahan', 3]],
    },
  },
  {
    id: 'integ-basic', chapter: 'integ', onSheet: false,
    name: { en: 'Integration of axⁿ', ms: 'Pengamiran axⁿ' },
    tex: '\\int ax^n\\,dx = \\frac{ax^{n+1}}{n+1} + c', text: '∫ axⁿ dx = axⁿ⁺¹/(n + 1) + c',
    kw: {
      en: ['integrate', 'integral', ['equation of the curve', 2], ['integration', 1]],
      ms: ['kamirkan', 'kamiran', ['persamaan lengkung', 2], ['pengamiran', 1]],
    },
  },
  {
    id: 'integ-area', chapter: 'integ', onSheet: true,
    name: { en: 'Area under a curve', ms: 'Luas di bawah lengkung' },
    tex: 'A = \\int_a^b y\\,dx \\;\\text{ or }\\; \\int_a^b x\\,dy', text: 'A = ∫ y dx  or  ∫ x dy',
    kw: {
      en: [['area under the curve', 4], ['area of the region', 3], ['bounded by', 3], ['shaded region', 1]],
      ms: [['luas di bawah lengkung', 4], ['luas rantau', 3], ['dibatasi oleh', 3], ['rantau berlorek', 1]],
    },
  },
  {
    id: 'integ-volume', chapter: 'integ', onSheet: true,
    name: { en: 'Volume of revolution', ms: 'Isi padu janaan' },
    tex: 'V = \\int_a^b \\pi y^2\\,dx \\;\\text{ or }\\; \\int_a^b \\pi x^2\\,dy', text: 'V = ∫ πy² dx  or  ∫ πx² dy',
    kw: {
      en: [['volume generated', 4], ['revolved through 360°', 4], ['rotated through 360°', 4], ['revolved', 2]],
      ms: [['isi padu janaan', 4], ['dikisarkan melalui 360°', 4], ['dikisarkan', 2]],
    },
  },
  {
    id: 'kinematics', chapter: 'kinematics', onSheet: false,
    name: { en: 'Displacement – velocity – acceleration', ms: 'Sesaran – halaju – pecutan' },
    tex: 'v = \\frac{ds}{dt},\\; a = \\frac{dv}{dt},\\; s = \\int v\\,dt,\\; v = \\int a\\,dt',
    text: 'v = ds/dt,  a = dv/dt,  s = ∫ v dt,  v = ∫ a dt',
    kw: {
      en: [['particle moves', 3], ['velocity', 3], ['acceleration', 3], ['displacement', 3], ['momentarily at rest', 4], ['fixed point o', 3]],
      ms: [['zarah bergerak', 3], ['halaju', 3], ['halajunya', 3], ['pecutan', 3], ['sesaran', 3], ['berhenti seketika', 4], ['titik tetap o', 3]],
    },
  },

  // ───────────────────────────── G – GEOMETRY ─────────────────────────────
  {
    id: 'cg-distance', chapter: 'coord-geo', onSheet: true,
    name: { en: 'Distance between two points', ms: 'Jarak antara dua titik' },
    tex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}', text: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)',
    kw: { en: [['distance between', 3], ['length of the line', 2]], ms: [['jarak antara', 3], ['panjang garis', 2]] },
  },
  {
    id: 'cg-midpoint', chapter: 'coord-geo', onSheet: true,
    name: { en: 'Midpoint', ms: 'Titik tengah' },
    tex: '\\left(\\frac{x_1+x_2}{2},\\, \\frac{y_1+y_2}{2}\\right)', text: '((x₁ + x₂)/2, (y₁ + y₂)/2)',
    kw: { en: [['midpoint', 3], ['mid-point', 3]], ms: [['titik tengah', 3]] },
  },
  {
    id: 'cg-divisor', chapter: 'coord-geo', onSheet: true,
    name: { en: 'Point dividing a line segment m : n', ms: 'Titik membahagi tembereng garis m : n' },
    tex: '\\left(\\frac{nx_1+mx_2}{m+n},\\, \\frac{ny_1+my_2}{m+n}\\right)', text: '((nx₁ + mx₂)/(m + n), (ny₁ + my₂)/(m + n))',
    kw: {
      en: [['divides', 2], ['internally', 3], ['in the ratio', 2], ['line segment', 1]],
      ms: [['membahagi', 2], ['secara dalam', 3], ['dengan nisbah', 2], ['tembereng garis', 1]],
    },
  },
  {
    id: 'cg-area', chapter: 'coord-geo', onSheet: true,
    name: { en: 'Area of polygon (coordinates)', ms: 'Luas poligon (koordinat)' },
    tex: 'A = \\tfrac{1}{2}\\left|(x_1y_2 + x_2y_3 + x_3y_1) - (x_2y_1 + x_3y_2 + x_1y_3)\\right|',
    text: 'A = ½ |(x₁y₂ + x₂y₃ + x₃y₁) − (x₂y₁ + x₃y₂ + x₁y₃)|',
    kw: {
      en: [['area of the triangle', 2], ['area of triangle', 2], ['area of the quadrilateral', 3], ['vertices', 2]],
      ms: [['luas segi tiga', 2], ['luas sisi empat', 3], ['bucu-bucu', 2]],
    },
  },
  {
    id: 'cg-line', chapter: 'coord-geo', onSheet: false,
    name: { en: 'Straight lines: parallel & perpendicular', ms: 'Garis lurus: selari & serenjang' },
    tex: 'y - y_1 = m(x - x_1),\\; m_1 = m_2,\\; m_1 m_2 = -1', text: 'y − y₁ = m(x − x₁),  parallel m₁ = m₂,  perpendicular m₁m₂ = −1',
    kw: {
      en: [['perpendicular', 3], ['parallel', 2], ['equation of the straight line', 3], ['perpendicular bisector', 4]],
      ms: [['serenjang', 3], ['selari', 2], ['persamaan garis lurus', 3], ['pembahagi dua sama serenjang', 4]],
    },
  },
  {
    id: 'cg-locus', chapter: 'coord-geo', onSheet: false,
    name: { en: 'Locus (distance condition)', ms: 'Lokus (syarat jarak)' },
    tex: 'PA = k \\cdot PB \\;\\Rightarrow\\; \\sqrt{(x-x_1)^2+(y-y_1)^2} = k\\sqrt{(x-x_2)^2+(y-y_2)^2}',
    text: 'PA = k·PB → √((x − x₁)² + (y − y₁)²) = k√((x − x₂)² + (y − y₂)²)',
    kw: { en: [['locus', 4], ['moves such that', 3], ['equidistant', 3]], ms: [['lokus', 4], ['bergerak dengan keadaan', 3], ['jarak yang sama', 3]] },
  },
  {
    id: 'vec-magnitude', chapter: 'vectors', onSheet: true,
    name: { en: 'Magnitude & unit vector', ms: 'Magnitud & vektor unit' },
    tex: '|\\underset{\\sim}{r}| = \\sqrt{x^2+y^2},\\; \\hat{r} = \\frac{x\\underset{\\sim}{i} + y\\underset{\\sim}{j}}{\\sqrt{x^2+y^2}}',
    text: '|r| = √(x² + y²),  r̂ = (xi + yj) / √(x² + y²)',
    kw: {
      en: [['unit vector', 4], ['magnitude', 3], ['vector', 1], ['vectors', 1]],
      ms: [['vektor unit', 4], ['magnitud', 3], ['vektor', 1]],
    },
  },
  {
    id: 'vec-triangle', chapter: 'vectors', onSheet: false,
    name: { en: 'Triangle law & collinear vectors', ms: 'Hukum segi tiga & vektor segaris' },
    tex: '\\overrightarrow{AB} = \\overrightarrow{AO} + \\overrightarrow{OB} = \\overrightarrow{OB} - \\overrightarrow{OA},\\; \\overrightarrow{AB} = k\\,\\overrightarrow{BC}',
    text: 'AB = AO + OB = OB − OA;  collinear: AB = k·BC',
    kw: {
      en: [['in terms of', 1], ['collinear', 4], ['resultant', 3], ['position vector', 3], ['triangle law', 3]],
      ms: [['dalam sebutan', 1], ['segaris', 4], ['paduan', 3], ['vektor kedudukan', 3], ['hukum segi tiga', 3]],
    },
  },
  {
    id: 'circ-arc', chapter: 'circular', onSheet: true,
    name: { en: 'Arc length', ms: 'Panjang lengkok' },
    tex: 's = r\\theta', text: 's = rθ',
    kw: {
      en: [['arc length', 4], ['length of the arc', 4], ['length of arc', 4], ['perimeter', 2], ['radian', 2], ['radians', 2]],
      ms: [['panjang lengkok', 4], ['perimeter', 2], ['radian', 2]],
    },
  },
  {
    id: 'circ-sector', chapter: 'circular', onSheet: true,
    name: { en: 'Area of sector', ms: 'Luas sektor' },
    tex: 'A = \\tfrac{1}{2} r^2 \\theta', text: 'A = ½ r²θ',
    kw: {
      en: [['area of the sector', 4], ['area of sector', 4], ['sector', 2], ['shaded region', 1], ['radian', 1], ['radians', 1]],
      ms: [['luas sektor', 4], ['sektor', 2], ['rantau berlorek', 1], ['radian', 1]],
    },
  },

  // ─────────────────────────── T – TRIGONOMETRY ───────────────────────────
  {
    id: 'trig-identity', chapter: 'trig-func', onSheet: true,
    name: { en: 'Basic identities', ms: 'Identiti asas' },
    tex: '\\sin^2A + \\cos^2A = 1,\\; \\sec^2A = 1 + \\tan^2A,\\; \\operatorname{cosec}^2A = 1 + \\cot^2A',
    text: 'sin²A + cos²A = 1,  sec²A = 1 + tan²A,  cosec²A = 1 + cot²A',
    kw: {
      en: [['prove that', 1], ['identity', 3], ['cosec', 2], ['cot', 2], ['sec', 2]],
      ms: [['buktikan bahawa', 1], ['identiti', 3], ['kosek', 2], ['kot', 2], ['sek', 2]],
    },
  },
  {
    id: 'trig-compound', chapter: 'trig-func', onSheet: true,
    name: { en: 'Compound angle formulae', ms: 'Rumus sudut majmuk' },
    tex: '\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B,\\; \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B',
    text: 'sin(A ± B) = sinA cosB ± cosA sinB,  cos(A ± B) = cosA cosB ∓ sinA sinB',
    kw: {
      en: [['compound angle', 3], ['sin (a + b)', 4], ['sin (a − b)', 4], ['cos (a + b)', 4], ['cos (a − b)', 4], ['without using a calculator', 1], ['acute angles', 1]],
      ms: [['sudut majmuk', 3], ['sin (a + b)', 4], ['sin (a − b)', 4], ['kos (a + b)', 4], ['kos (a − b)', 4], ['tanpa menggunakan kalkulator', 1], ['sudut tirus', 1]],
    },
  },
  {
    id: 'trig-double', chapter: 'trig-func', onSheet: true,
    name: { en: 'Double angle formulae', ms: 'Rumus sudut berganda' },
    tex: '\\sin 2A = 2\\sin A\\cos A,\\; \\cos 2A = \\cos^2A - \\sin^2A = 1 - 2\\sin^2A,\\; \\tan 2A = \\frac{2\\tan A}{1-\\tan^2A}',
    text: 'sin 2A = 2 sinA cosA,  cos 2A = cos²A − sin²A = 1 − 2sin²A,  tan 2A = 2tanA / (1 − tan²A)',
    kw: {
      en: [['double angle', 3], ['sin 2x', 2], ['cos 2x', 2], ['tan 2x', 2], ['cosec 2x', 2]],
      ms: [['sudut berganda', 3], ['sin 2x', 2], ['kos 2x', 2], ['tan 2x', 2], ['kosek 2x', 2]],
    },
  },
  {
    id: 'trig-graph', chapter: 'trig-func', onSheet: false,
    name: { en: 'Trigonometric graphs', ms: 'Graf trigonometri' },
    tex: 'y = a\\sin bx + c:\\; \\text{amplitude } |a|,\\; b \\text{ cycles in } 0 \\le x \\le 2\\pi',
    text: 'y = a sin bx + c: amplitude |a|, b cycles in 0 ≤ x ≤ 2π',
    kw: {
      en: [['sketch the graph', 2], ['number of solutions', 3], ['2π', 2], ['amplitude', 3]],
      ms: [['lakar graf', 2], ['bilangan penyelesaian', 3], ['2π', 2], ['amplitud', 3]],
    },
  },
  {
    id: 'tri-sine-rule', chapter: 'triangles', onSheet: true,
    name: { en: 'Sine rule', ms: 'Petua sinus' },
    tex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}', text: 'a/sin A = b/sin B = c/sin C',
    kw: {
      en: [['sine rule', 4], ['ambiguous case', 4], ['triangle', 1], ['∠', 1]],
      ms: [['petua sinus', 4], ['kes berambiguiti', 4], ['segi tiga', 1], ['∠', 1]],
    },
  },
  {
    id: 'tri-cosine-rule', chapter: 'triangles', onSheet: true,
    name: { en: 'Cosine rule', ms: 'Petua kosinus' },
    tex: 'a^2 = b^2 + c^2 - 2bc\\cos A', text: 'a² = b² + c² − 2bc cos A',
    kw: {
      en: [['cosine rule', 4], ['triangle', 1], ['∠', 1]],
      ms: [['petua kosinus', 4], ['segi tiga', 1], ['∠', 1]],
    },
  },
  {
    id: 'tri-area', chapter: 'triangles', onSheet: true,
    name: { en: 'Area of triangle (½ab sin C)', ms: 'Luas segi tiga (½ab sin C)' },
    tex: 'A = \\tfrac{1}{2}ab\\sin C', text: 'A = ½ ab sin C',
    kw: { en: [['area of triangle', 2], ['area of the triangle', 2]], ms: [['luas segi tiga', 2]] },
  },

  // ───────────────────────────── S – STATISTICS ─────────────────────────────
  {
    id: 'perm', chapter: 'perm-comb', onSheet: true,
    name: { en: 'Permutation', ms: 'Pilih atur' },
    tex: '{}^nP_r = \\frac{n!}{(n-r)!}', text: 'ⁿPᵣ = n! / (n − r)!',
    kw: {
      en: [['arranged', 3], ['arrangements', 3], ['permutation', 4], ['in a row', 3], ['number of ways', 1]],
      ms: [['disusun', 3], ['susunan', 3], ['pilih atur', 4], ['dalam satu baris', 3], ['bilangan cara', 1]],
    },
  },
  {
    id: 'comb', chapter: 'perm-comb', onSheet: true,
    name: { en: 'Combination', ms: 'Gabungan' },
    tex: '{}^nC_r = \\frac{n!}{(n-r)!\\,r!}', text: 'ⁿCᵣ = n! / ((n − r)! r!)',
    kw: {
      en: [['combination', 4], ['committee', 3], ['selected', 2], ['chosen', 1], ['team', 2], ['number of ways', 1]],
      ms: [['gabungan', 4], ['jawatankuasa', 3], ['dipilih', 1], ['pasukan', 2], ['bilangan cara', 1]],
    },
  },
  {
    id: 'binom', chapter: 'prob-dist', onSheet: true,
    name: { en: 'Binomial distribution', ms: 'Taburan binomial' },
    tex: 'P(X = r) = {}^nC_r\\, p^r q^{n-r},\\; p + q = 1', text: 'P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ,  p + q = 1',
    kw: {
      en: [['binomial', 4], ['probability that', 2], ['chosen at random', 2], ['exactly', 1], ['at least', 1], ['at most', 1]],
      ms: [['binomial', 4], ['kebarangkalian', 2], ['dipilih secara rawak', 2], ['tepat', 1], ['sekurang-kurangnya', 1], ['selebih-lebihnya', 1]],
    },
  },
  {
    id: 'binom-mean', chapter: 'prob-dist', onSheet: true,
    name: { en: 'Mean & SD of binomial', ms: 'Min & sisihan piawai binomial' },
    tex: '\\mu = np,\\; \\sigma = \\sqrt{npq}', text: 'μ = np,  σ = √(npq)',
    kw: { en: [['expected number', 3], ['binomial', 1]], ms: [['bilangan yang dijangkakan', 3], ['binomial', 1]] },
  },
  {
    id: 'normal-z', chapter: 'prob-dist', onSheet: true,
    name: { en: 'Normal distribution: standard score', ms: 'Taburan normal: skor piawai' },
    tex: 'Z = \\frac{X - \\mu}{\\sigma}', text: 'Z = (X − μ) / σ',
    kw: {
      en: [['normally distributed', 4], ['normal distribution', 4], ['standard score', 4], ['z-score', 4], ['mean', 1], ['standard deviation', 1]],
      ms: [['bertaburan secara normal', 4], ['taburan normal', 4], ['skor piawai', 4], ['min', 1], ['sisihan piawai', 1]],
    },
  },
  {
    id: 'idx-num', chapter: 'index-num', onSheet: true,
    name: { en: 'Index number', ms: 'Nombor indeks' },
    tex: 'I = \\frac{Q_1}{Q_0} \\times 100', text: 'I = Q₁ / Q₀ × 100',
    kw: {
      en: [['price index', 4], ['index number', 4], ['base year', 4]],
      ms: [['indeks harga', 4], ['nombor indeks', 4], ['tahun asas', 4]],
    },
  },
  {
    id: 'idx-composite', chapter: 'index-num', onSheet: true,
    name: { en: 'Composite index', ms: 'Indeks gubahan' },
    tex: '\\bar{I} = \\frac{\\sum W_i I_i}{\\sum W_i}', text: 'Ī = ΣWᵢIᵢ / ΣWᵢ',
    kw: { en: [['composite index', 4], ['weightage', 3], ['weightages', 3]], ms: [['indeks gubahan', 4], ['pemberat', 3]] },
  },
];

export const formulaById = Object.fromEntries(FORMULAS.map((f) => [f.id, f]));
