document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const homePage = document.getElementById("home-page");
    const instructionsPage = document.getElementById("instructions-page");
    const testPage = document.getElementById("test-page");
    const reviewPage = document.createElement("div");
    const userMatric = document.getElementById("user-matric");
    const userMatricTest = document.getElementById("user-matric-test");
    const startTestBtn = document.getElementById("start-test");
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const questionIconsDiv = document.getElementById("question-icons");
    const saveButton = document.getElementById("save");
    const submitButton = document.getElementById("submit-test");
    const timerDisplay = document.createElement("div");

    let currentQuestion = 1;
    const totalQuestions = 30;
    let timeLeft = 23 * 60;
    let timerInterval;
    const answers = {};
    let selectedQuestions = [];

    const allQuestions = [
        { 
          type: "mcq", 
          question: "__________ is used to prove the validity of proposition of the set of non-negative integers.", 
          options: [
            "A. Real number system",
            "B. Real line",
            "C. Associativity",
            "D. The principle of mathematical induction"
          ], 
          answer: "D" 
        },
        { 
          type: "mcq", 
          question: "Which of the following statements is false for all positive integers using the principle of mathematical induction?", 
          options: [
            "A. 2n > n",
            "B. 52n + 3n + 1 is a multiple of 9",
            "C. 5n − 1 is a multiple of 4",
            "D. 72n+1 + 1 is a multiple of 3"
          ], 
          answer: "D" 
        },
        { 
          type: "mcq", 
          question: "A student of the Department of Mathematical Sciences, Federal University of Technology, Akure was asked to show that 5n − 1 is divisible by 4 for all positive integers using the principle of mathematical induction. Which of the following mathematical statements is correct for all positive integers M?", 
          options: [
            "A. f(1) = 8",
            "B. f(M) = 4(5M + 1)",
            "C. f(k + 1) = 4(5M + 1)",
            "D. f(k) = 4(5M + 1)"
          ], 
          answer: "C" 
        },
        { 
          type: "mcq", 
          question: "Which of the following is not one of the properties of real numbers?", 
          options: [
            "A. existence of the multiplicative inverse",
            "B. closure",
            "C. it satisfies the principle of mathematical induction",
            "D. existence of the zero of the set"
          ], 
          answer: "C" 
        },
        { 
          type: "mcq", 
          question: "Let a, b, c and d be real numbers. Which of the following statements is false?", 
          options: [
            "A. if a > b, then a + c < b + c",
            "B. if a > b and c > 0, then ac > bc",
            "C. if a > b and c < 0, then ac < bc",
            "D. if a > b and c > d, then a + c > b + d"
          ], 
          answer: "A" 
        },
        { 
          type: "mcq", 
          question: "A 100L student of the Department of Biochemistry, Federal University of Technology, Akure, Samuel Victory, was asked to use the principle of mathematical induction to prove that ∑(i=0 to n) x^i = (1 - x^(n+1))/(1-x). For what values of x can she prove this?", 
          options: [
            "A. for all real numbers x",
            "B. for all real numbers x satisfying x ≠ 1",
            "C. for all real numbers x satisfying x = 1",
            "D. for all positive integers n"
          ], 
          answer: "B" 
        },
        { 
          type: "mcq", 
          question: "Mr. Dansu’s project student was asked to prove that f(n) = n⁴ + 4n² + 11 is divisible by 16 for all odd positive integers. What are the possible values of n?", 
          options: [
            "A. 1, 2, 3, …, k, k+1 where k is a positive integer",
            "B. 1, 2, 3, …, k, k+1, …, ∞ where k is a positive integer",
            "C. 1, 3, …, 2k-1, 2k+1, … where k is a positive integer",
            "D. none of the above"
          ], 
          answer: "C" 
        },
        { 
          type: "mcq", 
          question: "In proving that f(n) = 7^(2n+1) + 1 is a multiple of 8, Mr. Olodo assumed that the proposition is valid when n = k where k is a positive integer. Which of the following statements is correct?", 
          options: [
            "A. f(k + 1) = 344",
            "B. f(k + 1) = 8(49M − 6) where M is a positive integer",
            "C. f(k + 1) = 8M − 1 where M is a positive integer",
            "D. f(k + 1) = 8(49M + 6) where M is a positive integer"
          ], 
          answer: "B" 
        },
        { 
          type: "mcq", 
          question: "Which of the following laws of algebra of addition and multiplication of natural numbers is incorrect for all x, y, z ∈ N?", 
          options: [
            "A. Closure: (i) x + y ∈ N   (ii) x · y ∈ N",
            "B. Commutative: (i) x + y = y + x  (ii) x · y = y · x",
            "C. Associative: (i) x + (y + z) = (x + y) + z  (ii) x · (y + z) = (x · y) · z",
            "D. Distributive: (i) x · (y + z) = x · y + x · z  (ii) (y + z) · x = y · x + z · x"
          ], 
          answer: "C" 
        },
        { 
          type: "mcq", 
          question: "Given that for all positive integer values of n, 52n + 3n − 1 is an integer multiple of 9. If k is a positive integer, then by the principle of mathematical induction", 
          options: [
            "A. f(k + 1) = 9(25M + 8k + 3) where M is a positive integer",
            "B. f(k + 1) = 9(25M − 8k + 3) where M is a positive integer",
            "C. f(k + 1) = 52(k+1) + 3k + 2 where M is a positive integer",
            "D. f(k) = 52(k+1) + 3k + 2 where M is a positive integer"
          ], 
          answer: "B" 
        },

        { 
            type: "mcq", 
            question: "Which of the following is the sequential arrangement of the application of the principle of mathematical induction?\n(i) If T1 is true\n(ii) then Tn is true for every positive integer n\n(iii) for every positive integer k, the truth of Tk would imply the truth of Tk+1.", 
            options: [
              "A. ii, i and iii",
              "B. i, ii and iii",
              "C. i, iii and ii",
              "D. iii, ii and i"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "Given that 1/(1∙2) + 1/(2∙3) + 1/(3∙4) + ⋯ + 1/(n(n+1)) = n/(n+1). If k is a positive integer, then by the use of the principle of mathematical induction,", 
            options: [
              "A. f(k + 1) = (k+3)/((k+1)(k+2))",
              "B. f(k + 1) = (k+3)/((k+1)(k+3))",
              "C. f(k + 1) = 1/((k+1)(k+2))",
              "D. f(k + 1) = k/(k+1)"
            ], 
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "Given that 1/(1∙3) + 1/(3∙5) + 1/(5∙7) + ⋯ + 1/((2n−1)(2n+1)) = n/(2n+1). If k is a positive integer, then by the use of the principle of mathematical induction,", 
            options: [
              "A. f(k + 1) = (k+1)/(2k+3)",
              "B. f(k + 1) = k/(2k+3)",
              "C. f(k + 1) = k/(2k+1)",
              "D. f(k + 1) = 1/((2k+1)(2k+3))"
            ], 
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "Given that 1/x + 1/x² + 1/x³ + ⋯ + 1/xⁿ = 1/(x−1) − 1/(xⁿ(x−1)). If k is a positive integer, then by the use of the principle of mathematical induction,", 
            options: [
              "A. f(k + 1) = 1/(x−1) − 1/(x^(k+1)(x−1))",
              "B. f(k + 1) = 1/(x−1) − 1/(x^k(x−1))",
              "C. f(k + 1) = x^(k−1)/(x^(k+1)(x−1))",
              "D. f(k + 1) = (x^(k+1) − 1)/(x^(k+1)(x−1))"
            ], 
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "Given the set A = {a, b, c, d}; which of the following is not an element of the power set of A?", 
            options: [
              "A. {a, b}",
              "B. {Ø}",
              "C. A",
              "D. {a, b, c}"
            ], 
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "How many subsets will a set containing 5 elements have?", 
            options: [
              "A. 32",
              "B. 25",
              "C. 36",
              "D. 64"
            ], 
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "If µ = {e, f, g, h, p, q, r, s} is the universal set, M = {e, h, q, s} and N = {h, p, r}, find Mᶜ ∪ Nᶜ.", 
            options: [
              "A. {f, p, r}",
              "B. {e, f, q, s}",
              "C. {e, f, g, p, q, r, s}",
              "D. {e, g, p, q, r, s}"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "P and Q are subsets of the universal set µ defined as µ = {x: x is an integer and 1 < x < 15}, where P = {x: x is odd} and Q = {x: x is prime}. Find the cardinal number of the intersection of the complements of P and Q.", 
            options: [
              "A. 3",
              "B. 4",
              "C. 5",
              "D. 6",
              "E. 9"
            ], 
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "If P = {1, 2, 3, 4, 5, 6, 7, 8}, Q = {1, 4, 9}, and R = {2, 4, 8}, find (P ∩ Q) ∪ R.", 
            options: [
              "A. {1, 2, 4, 8}",
              "B. {1, 2, 4, 8, 9}",
              "C. {1, 2, 4, 7, 8}",
              "D. {1, 2, 3, 4, 5, 6, 7, 8}"
            ], 
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "In a class of 40 students, 24 play football, 18 play volleyball and 6 do not play any game. How many students play both football and volleyball?", 
            options: [
              "A. 2",
              "B. 7",
              "C. 8",
              "D. 9"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "Four members of a school first eleven cricket team are also members of the first fourteen Rugby team. How many boys play in only one of the two teams?", 
            options: [
              "A. 25",
              "B. 21",
              "C. 17",
              "D. 29"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "If S = {x: x² = 9, x < 2} then S is equal to", 
            options: [
              "A. {-3}",
              "B. {3}",
              "C. Ø",
              "D. {-3, 3}"
            ], 
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "A school of 38 teachers has 15 married women. If 6 of the teachers are couples, how many of the teachers are neither married nor have their spouses in the school?", 
            options: [
              "A. 17",
              "B. 23",
              "C. 20",
              "D. 21"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "Which of the following is equivalent to [Pᶜ ∪ (Q ∩ Qᶜ)]?", 
            options: [
              "A. P",
              "B. Pᶜ",
              "C. Q",
              "D. Qᶜ"
            ], 
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "Given that the sets A and B are partitioned sets of E; then A ∩ (E ∩ B)ᶜ is", 
            options: [
              "A. A",
              "B. Ø",
              "C. B",
              "D. E"
            ], 
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "Which of the following sets is equivalent to (P ∪ Q) ∩ (P ∩ Qᶜ)?", 
            options: [
              "A. P ∪ Q",
              "B. P ∪ Qᶜ",
              "C. P ∩ Qᶜ",
              "D. Ø"
            ], 
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "P and Q are subsets of the universal set U defined as U = {x: x³ − x² − x + 1 = 0}, where P = {x: x is an integer} and Q = {x: x is odd}. Find P ∩ Q.", 
            options: [
              "A. {-1, 1, 1}",
              "B. {-1, 1}",
              "C. {1, 1, -1}",
              "D. {-1, -1}"
            ], 
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "If E = {1, 2, 3, 4} and A = {1, 3, 5}, the symmetric difference of E and A, written A Δ E, is", 
            options: [
              "A. {1, 2}",
              "B. {2, 4, 5}",
              "C. {1, 2, 3, 4, 5}",
              "D. {1, 3}"
            ], 
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "If the universal set U = {x: x is a natural number and 1 ≤ x ≤ 9}, P = {x: 1 ≤ x < 4} and Q = {2, 4, 6, 8}, find (P ∪ Q)ᶜ.", 
            options: [
              "A. {1, 2, 3, 4, 5, 6, 7, 8, 9}",
              "B. {1, 2, 3, 4, 6, 8}",
              "C. {1, 5, 6, 7}",
              "D. {5, 7, 9}"
            ], 
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "In a science class of 41 students, each student offers at least one of Mathematics and Physics. If 22 students offer Physics and 28 students offer Mathematics, how many students offer Physics only?", 
            options: [
              "A. 19",
              "B. 9",
              "C. 13",
              "D. 14"
            ], 
            answer: "C" 
          },

          { 
            type: "mcq", 
            question: "31. If U = {0, 2, 3, 6, 7, 8, 9, 10} is the universal set, E = {0, 6, 8, 10} and F = {x: x⁴ = 14}. Find (E ∪ F)ᶜ.",
            options: [
              "A. {3, 7, 9}",
              "B. {2, 3, 7, 9}",
              "C. [3, 7, 9]",
              "D. Ø"
            ],
            // According to the attached PDF, the correct answer is marked as option A.
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "32. If X = {all prime factors of 44} and Y = {all prime factors of 60}. The elements of X ∪ Y and X ∩ Y respectively are:",
            options: [
              "A. {2, 4, 3, 5, 11} and {4}",
              "B. {4, 3, 5, 1} and {3, 4}",
              "C. {2, 5, 11} and {2}",
              "D. {2, 3, 5, 11} and {2}"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "33. Simplify (A ∪ B)ᶜ ∩ (A ∩ Bᶜ).",
            options: [
              "A. (Aᶜ ∪ B)",
              "B. A ∪ Bᶜ",
              "C. (A ∪ B)ᶜ",
              "D. ϕ"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "34. Simplify (A ∪ B)ᶜ ∩ Aᶜ.",
            options: [
              "A. (A ∪ B)",
              "B. A ∩ Bᶜ",
              "C. Aᶜ ∩ B",
              "D. (Aᶜ ∩ Bᶜ)"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "35. In a village all the people speak Hausa or English or both, if 56% speak Hausa and 63% speak English, what percentage speak both languages?",
            options: [
              "A. 19%",
              "B. 119%",
              "C. 62%",
              "D. 38%"
            ],
            answer: "A" 
          },
          { 
            type: "mcq", 
            question: "36. ____________ is a set that contains another set.",
            options: [
              "A. Power set",
              "B. Super set",
              "C. Subset",
              "D. Proper Set"
            ],
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "37. In a youth club with 94 members, 60 like modern music and 50 like traditional music. The number of members who like both traditional and modern music is thrice those who do not like any type of music. How many members like only one type of music?",
            options: [
              "A. 8",
              "B. 24",
              "C. 62",
              "D. 86"
            ],
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "38. The symmetric difference of A and B, expressed A △ B, is equal to:",
            options: [
              "A. (A − B) ∩ (B − A)",
              "B. (A − B) ∪ (B − A)",
              "C. (A ∩ B) ∪ (B ∩ A)",
              "D. (A ∪ B) ∩ (B ∪ A)"
            ],
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "39. If ξ = {e, f, g, h, p, q, r, s}, M = {e, h, q, s} and N = {h, p, r}, find Mᶜ ∪ Nᶜ.",
            options: [
              "A. {f, p, r}",
              "B. {e, f, q, s}",
              "C. {e, f, g, p, q, r, s}",
              "D. {e, g, p, q, r, s}"
            ],
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "40. How many subsets will a set containing 6 elements have?",
            options: [
              "A. 25",
              "B. 32",
              "C. 36",
              "D. 64"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "41. Which of the following is equivalent to {Pᶜ ∩ (Q ∪ Qᶜ)}?",
            options: [
              "A. P",
              "B. Pᶜ",
              "C. Q",
              "D. ϕ"
            ],
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "42. Which of the following options below is true?",
            options: [
              "A. A ∪ Aᶜ = A",
              "B. A ∩ Aᶜ = A",
              "C. (Aᶜ)ᶜ = U",
              "D. nP(A) = 2ⁿ(A)"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "43. Out of 25 teachers, 16 are married and 15 are women. If 6 of the men are married, how many of the women are not married?",
            options: [
              "A. 6",
              "B. 10",
              "C. 5",
              "D. 9"
            ],
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "44. Which of the following is not a true property of a Cartesian product?",
            options: [
              "A. (A ∩ B) x (C ∩ D) = (A x C) ∩ (B x D)",
              "B. (A ∪ B) x (C ∪ D) = (A x C) ∪ (B x D)",
              "C. (A ∪ B) x C = (A x C) ∪ (B x C)",
              "D. A x ϕ = ϕ x A = A"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "45. If (A ∩ Bᶜ) ∪ (Aᶜ ∩ B) = A Δ B, what does the symbol 'Δ' signify?",
            options: [
              "A. difference",
              "B. asymmetric difference",
              "C. symmetric difference",
              "D. union"
            ],
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "46. Let U = {1, 2, 3, 4, 5, 6} be the universal set, A = {1, 2, 3} and B = {4, 5, 6}. Find Aᶜ ∪ (B ∪ Bᶜ).",
            options: [
              "A. Ø",
              "B. {1, 2, 3}",
              "C. {4, 5, 6}",
              "D. U"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "47. C = {1, 2, 3, 4, ...}. What is the name of the set C?",
            options: [
              "A. Finite set",
              "B. Closed set",
              "C. Universal set",
              "D. Infinite set"
            ],
            answer: "D" 
          },
          { 
            type: "mcq", 
            question: "48. What does the set {x: x ∉ A and x ∈ B} define?",
            options: [
              "A. set containing elements in A and not in B",
              "B. set containing elements not in A but in B",
              "C. set containing elements both in A and B",
              "D. set containing elements both in A and B"
            ],
            answer: "B" 
          },
          { 
            type: "mcq", 
            question: "49. When a set C = {} it means that C is ______.",
            options: [
              "A. a universal set",
              "B. C is a finite set",
              "C. C is an empty set",
              "D. a universal set"
            ],
            answer: "C" 
          },
          { 
            type: "mcq", 
            question: "50. A ⊆ B and B ⊆ C implies A ⊆ C is the _______________.",
            options: [
              "A. Complementary law",
              "B. Transitivity Law",
              "C. Inverse law",
              "D. Commutativity law"
            ],
            answer: "B" 
          },

          //Trigonometry
          {
            type: "mcq",
            question: "Evaluate sin²θ / (cos²θ − 1)",
            options: [
              "A. −1",
              "B. 1",
              "C. 2",
              "D. −2"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Simplify sin²x / tan x",
            options: [
              "A. sin x",
              "B. cos x",
              "C. sin x cos x",
              "D. sin²x cos²x"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "If tan(½x) = b, express tan x in terms of b.",
            options: [
              "A. 2b",
              "B. 1 − b²",
              "C. (1 − b²) / 2b",
              "D. 2b / (1 − b²)"
            ],
            answer: "D"
          },
          {
            type: "mcq",
            question: "If tan(½x) = f, what is sin x in terms of f?",
            options: [
              "A. 2f / (1 + f²)",
              "B. 2f / (1 + f)",
              "C. 2f² / (1 + f)",
              "D. 2f² / (1 + f²)"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "If tan(½x) = k, what is cos x in terms of k?",
            options: [
              "A. 2k² / (1 + k²)",
              "B. (1 − 2k²) / (1 + k²)",
              "C. (1 − k²) / (1 + k²)",
              "D. (1 + k²) / (1 − k²)"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "What is the result of 1 + tan²θ?",
            options: [
              "A. sin²θ",
              "B. sec²θ",
              "C. cos²θ",
              "D. tan²θ"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "Evaluate 1 + cot²θ.",
            options: [
              "A. sin²θ",
              "B. cosec²θ",
              "C. cos²θ",
              "D. tan²θ"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "Simplify sin²p + (1 + cos²p)²",
            options: [
              "A. 2(1 + cos p)",
              "B. 2 cos p",
              "C. 1 + cos p",
              "D. cos p − 1"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Evaluate (1 + sin ∅)/(1 + cos ∅) × (1 + sec ∅)/(1 + cosec ∅)",
            options: [
              "A. sin ∅",
              "B. cos ∅",
              "C. tan ∅",
              "D. cot ∅"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Expand tan (45° + A)",
            options: [
              "A. (1 + tan A)/(1 + tan A)",
              "B. (1 − tan A)/(1 − tan A)",
              "C. (1 + tan A)/tan A",
              "D. (1 + tan A)/(1 − tan A)"
            ],
            answer: "D"
          },

          {
            type: "mcq",
            question: "Evaluate tan (90° + A)",
            options: [
              "A. 0",
              "B. ∞",
              "C. −1",
              "D. 1"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "If sin 45° = cos 45° = 1/√2; sin 30° = 1/2; cos 30° = √3/2, evaluate sin 75°.",
            options: [
              "A. (√2 + √6)/4",
              "B. (√2 − √6)/4",
              "C. (√6 − √2)/4",
              "D. (√2 + √3)/4"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "If sin 45° = cos 45° = 1/√2; sin 30° = 1/2; cos 30° = √3/2, evaluate cos 75°.",
            options: [
              "A. (√6 + √2)/4",
              "B. (√2 + √3)/4",
              "C. (√6 − √2)/4",
              "D. (√2 − √6)/4"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Find cos 105°, if sin 45° = cos 45° = 1/√2, sin 60° = √3/2; cos 60° = 1/2",
            options: [
              "A. (√2 + √6)/4",
              "B. (√2 − √6)/4",
              "C. (√2 − √6)/5",
              "D. (√2 − √3)/4"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "Which of these evaluates to 1?",
            options: [
              "A. sec²x − tan²x",
              "B. sec²x + tan²x",
              "C. tan²x − sec²x",
              "D. tan x − sec²x"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Which of these evaluates to 1?",
            options: [
              "A. cot y − cosec y",
              "B. cot²y − cosec²y",
              "C. cosec y − cot y",
              "D. cosec²y − cot²y"
            ],
            answer: "D"
          },
          {
            type: "mcq",
            question: "Evaluate sec²p − 1.",
            options: [
              "A. tan p",
              "B. tan p sec p",
              "C. tan²p",
              "D. tan³p"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Evaluate tan²q − sec²q.",
            options: [
              "A. 1",
              "B. −1",
              "C. 2",
              "D. −2"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "What is the result of sec²x − tan²x?",
            options: [
              "A. 1",
              "B. −1",
              "C. 2",
              "D. −2"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Which of these evaluates to −1?",
            options: [
              "A. cot²r + cosec²r",
              "B. cot r",
              "C. cot²r − cosec²r",
              "D. cot r − cosec r"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Which of these is equivalent to sin 2w?",
            options: [
              "A. 2 sin w cos w",
              "B. 2 sin²w",
              "C. 2 cos²w",
              "D. sin w cos w"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Which of these is equivalent to cos 2z?",
            options: [
              "A. 1 − cos²z",
              "B. 1 + cos z",
              "C. 2 cos²z − 1",
              "D. 1 + 2 cos²z"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Which of these is equivalent to tan 2t?",
            options: [
              "A. (1 − tan²t)/t",
              "B. (2 tan t)/(1 − tan²t)",
              "C. (1 − tan²t)/(2 tan t)",
              "D. (tan t + 1)/(2 tan t)"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "Expand sin v.",
            options: [
              "A. sin(½v) cos(½v)",
              "B. sin²(½v)",
              "C. cos²(½v)",
              "D. 2 sin(½v) cos(½v)"
            ],
            answer: "D"
          },
          {
            type: "mcq",
            question: "Expand cos a.",
            options: [
              "A. cos²(a/2) + 1",
              "B. 2 cos²(a/2) − 1",
              "C. 2 cos²(a/2) + 1",
              "D. 2 − cos²(a/2)"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "What is the equivalence of sin(p + q)?",
            options: [
              "A. sin p sin q + cos p cos q",
              "B. sin p sin q − cos p cos q",
              "C. sin p cos q − cos p sin q",
              "D. sin p cos q + cos p sin q"
            ],
            answer: "D"
          },
          {
            type: "mcq",
            question: "What is the equivalence of sin(p − q)?",
            options: [
              "A. sin p sin q + cos p cos q",
              "B. sin p sin q − cos p cos q",
              "C. sin p cos q − cos p sin q",
              "D. sin p cos q + cos p sin q"
            ],
            answer: "C"
          },
          {
            type: "mcq",
            question: "Expand cos(x + y).",
            options: [
              "A. cos x cos y − sin x sin y",
              "B. cos x cos y + sin x sin y",
              "C. sin x sin y − cos x cos y",
              "D. sin x sin y + cos x cos y"
            ],
            answer: "A"
          },
          {
            type: "mcq",
            question: "Expand cos(x − y).",
            options: [
              "A. cos x cos y − sin x sin y",
              "B. cos x cos y + sin x sin y",
              "C. sin x sin y − cos x cos y",
              "D. sin x sin y + cos x cos y"
            ],
            answer: "B"
          },
          {
            type: "mcq",
            question: "Express sin 60° in surd form.",
            options: [
              "A. 1/2",
              "B. √3/2",
              "C. 1/√2",
              "D. 0"
            ],
            answer: "B"
          },

          //Quadratic and Polynomials
          { 
            type: "mcq", 
            question: "Find the sum of the roots of the quadratic equation x² - 7x + 10 = 0.",  
            options: [
              "A. 2",
              "B. 5",
              "C. 7",
              "D. -7"
            ], 
            answer: "C"  // Using Vieta's formula: α+β = 7
          },
          { 
            type: "mcq", 
            question: "Find the product of the roots of the quadratic equation x² + 3x - 4 = 0.",  
            options: [
              "A. -4",
              "B. 3",
              "C. -3",
              "D. 4"
            ], 
            answer: "A"  // Using Vieta's formula: α·β = -4
          },
          { 
            type: "mcq", 
            question: "Solve the quadratic equation x² - 5x + 6 = 0. (Find the roots)",  
            options: [
              "A. x = 2 and x = 3",
              "B. x = -2 and x = -3",
              "C. x = 1 and x = 6",
              "D. x = -1 and x = -6"
            ], 
            answer: "A"  // Factorization: (x - 2)(x - 3) = 0
          },
          { 
            type: "mcq", 
            question: "Determine the quotient when 2x³ - 3x² + 4x - 5 is divided by (x - 2).",  
            options: [
              "A. 2x² + x + 6",
              "B. 2x² - x + 6",
              "C. 2x² + x - 6",
              "D. 2x² - x - 6"
            ], 
            answer: "A"  
            // Long division yields: Quotient = 2x² + x + 6 with a remainder of 7.
          },
          { 
            type: "mcq", 
            question: "When the polynomial P(x) = x³ + kx² - 4x + 8 is divided by (x + 2) the remainder is 0. Find k.",  
            options: [
              "A. -2",
              "B. 2",
              "C. -4",
              "D. 4"
            ], 
            answer: "A"  
            // Substitute x = -2 into P(x): (-8) + 4k + 8 + 8 = 4k + 8 = 0 implies k = -2.
          },
          { 
            type: "mcq", 
            question: "If (x - 1) and (x - 3) are factors of a quadratic polynomial ax² + bx + c and the value of the polynomial at x = 0 is 8, find the value of c.",  
            options: [
              "A. 8",
              "B. 3",
              "C. 0",
              "D. -8"
            ], 
            answer: "A"  
            // With factors (x-1)(x-3) = x² - 4x + 3, multiplied by a constant a.
            // c = a·3. Also, P(0)=a·(–1)(–3)= 3a=8 implies a = 8/3 so c = 3*(8/3)=8.
          },
          { 
            type: "mcq", 
            question: "Solve the quadratic equation 2x² - 4x - 6 = 0.",  
            options: [
              "A. x = 3 and x = -1",
              "B. x = 1 and x = -3",
              "C. x = -3 and x = 1",
              "D. x = 3 and x = 1"
            ], 
            answer: "A"  
            // Dividing by 2 gives: x² - 2x - 3 = 0, factorizes as (x - 3)(x + 1)=0.
          },
          { 
            type: "mcq", 
            question: "If the remainder when a polynomial P(x) is divided by (x - 2) is 5, what is P(2)?",  
            options: [
              "A. 2",
              "B. 5",
              "C. -5",
              "D. 0"
            ], 
            answer: "B"  
            // By the Remainder Theorem, P(2) equals the remainder 5.
          },
          { 
            type: "mcq", 
            question: "The polynomial P(x) = x³ - 4x² + x + 6 has a factor of the form (x - r). Find r.",  
            options: [
              "A. 2",
              "B. -2",
              "C. 3",
              "D. -3"
            ], 
            answer: "A"  
            // Testing r = 2: 8 - 16 + 2 + 6 = 0, so (x - 2) is a factor.
          },
          { 
            type: "mcq", 
            question: "If the sum of the coefficients of a polynomial P(x) is 0, then what is a root of P(x)?",  
            options: [
              "A. 0",
              "B. 1",
              "C. -1",
              "D. Cannot be determined"
            ], 
            answer: "B"  
            // Since P(1) equals the sum of the coefficients, if it is 0 then 1 is a root.
          },

          { 
            type: "mcq", 
            question: "If α, β, and γ are the roots of the equation x³ - 8x² + 9x + 18 = 0, and the sum of two of the roots is 5, find the value of α + β + γ.",  
            options: [
              "A. 8",
              "B. -8",
              "C. 9",
              "D. -9"
            ], 
            answer: "A"  // Sum of roots is 8 by Vieta
          },
          { 
            type: "mcq", 
            question: "If α, β, and γ are the roots of the equation x³ - 8x² + 9x + 18 = 0, and the sum of two of the roots is 5, find the value of αβ + βγ + γα.",  
            options: [
              "A. 9",
              "B. 0",
              "C. 8",
              "D. -8"
            ], 
            answer: "A"  // Sum of pairwise products is 9 by Vieta
          },
          { 
            type: "mcq", 
            question: "If α, β, and γ are the roots of the equation x³ - 8x² + 9x + 18 = 0, and the sum of two of the roots is 5, find the value of αβγ.",  
            options: [
              "A. 8",
              "B. 0",
              "C. 18",
              "D. -18"
            ], 
            answer: "D"  // Product of the roots is -18 by Vieta
          },
          { 
            type: "mcq", 
            question: "Find the quotient when 21y³ - 38y² + 29y - 40 is divided by 3y - 5.",  
            options: [
              "A. 7y² - y + 8",
              "B. 7y² - 73/3y + 453/3",
              "C. 7y² - 73/3y - 453/3",
              "D. 2y + 9"
            ], 
            answer: "A"  // Long division shows the quotient is 7y² - y + 8
          },
          { 
            type: "mcq", 
            question: "If (x - 1) and (x - 2) are factors of x² + ax - 7x + b, where a and b are constants, find a and b.",  
            options: [
              "A. a = 0,  b = 6",
              "B. a = 2,  b = 3",
              "C. a = 4,  b = 2",
              "D. a = 3,  b = 6"
            ], 
            answer: "C"  // Equate with (x - 1)(x - 2) = x² - 3x + 2
          },
          { 
            type: "mcq", 
            question: "If (x - 1) and (x - 2) are factors of x³ + ax² - 7x + b, where a and b are constants, find the third factor.",  
            options: [
              "A. (x)",
              "B. (x + 1)",
              "C. (x - 3)",
              "D. (x + 3)"
            ], 
            answer: "D"  // Matching coefficients gives the third factor as (x + 3)
          },

          { 
            type: "mcq", 
            question: "Find the discriminant of the quadratic equation x² - 4x + 7 = 0.",  
            options: [
              "A. -12",
              "B. -16",
              "C. 12",
              "D. 16"
            ], 
            answer: "A"  // Discriminant: Δ = (-4)² - 4(1)(7) = 16 - 28 = -12.
          },
          { 
            type: "mcq", 
            question: "If α and β are the roots of the quadratic equation x² - 5x + 6 = 0, find the value of α² + β².",  
            options: [
              "A. 13",
              "B. 14",
              "C. 15",
              "D. 16"
            ], 
            answer: "A"  
            // α and β are 2 and 3. So, α²+β² = 2² + 3² = 4 + 9 = 13.
          },
          { 
            type: "mcq", 
            question: "If (x - 1) is a factor of the polynomial P(x) = x³ + px² + qx + r, what is the value of P(1)?",  
            options: [
              "A. p + q + r",
              "B. 1",
              "C. 0",
              "D. r"
            ], 
            answer: "C"  
            // By the Factor Theorem, if (x - 1) is a factor, then P(1) = 0.
          },
          { 
            type: "mcq", 
            question: "Find all the integer roots of the cubic equation x³ - 6x² + 11x - 6 = 0.",  
            options: [
              "A. 1, 2, 3",
              "B. -1, -2, -3",
              "C. 1, 3, 6",
              "D. 2, 3, 4"
            ], 
            answer: "A"  
            // The polynomial factorizes as (x - 1)(x - 2)(x - 3).
          },
          { 
            type: "mcq", 
            question: "If 3 is a root of the quadratic equation 2x² + kx - 15 = 0, find the value of k.",  
            options: [
              "A. 1",
              "B. -1",
              "C. 3",
              "D. -3"
            ], 
            answer: "B"  
            // Substitute x = 3: 2(9) + 3k - 15 = 18 + 3k -15 = 3k + 3 = 0 ⟹ k = -1.
          },
          { 
            type: "mcq", 
            question: "Determine the remainder when the polynomial 4x³ - x² + 5x - 2 is divided by x + 1.",  
            options: [
              "A. -12",
              "B. 12",
              "C. -10",
              "D. 10"
            ], 
            answer: "A"  
            // Using the Remainder Theorem: P(-1) = 4(-1)³ - (-1)² + 5(-1) - 2 = -4 -1 -5 -2 = -12.
          },
          { 
            type: "mcq", 
            question: "If α and β are the roots of the quadratic equation x² - 3x + 2 = 0, find the value of α³ + β³.",  
            options: [
              "A. 6",
              "B. 7",
              "C. 9",
              "D. 10"
            ], 
            answer: "C"  
            // Since α and β are 1 and 2, α³+β³ = 1³+2³ = 1+8 = 9.
          },
          { 
            type: "mcq", 
            question: "Find the remainder when f(x) = 2x³ - 3x² + 4 is divided by (x - 1).",  
            options: [
              "A. 2",
              "B. 3",
              "C. 4",
              "D. 5"
            ], 
            answer: "B"  
            // Using the Remainder Theorem: f(1)=2-3+4=3.
          },
          { 
            type: "mcq", 
            question: "Find the x-coordinate of the vertex of the quadratic function y = 3x² - 12x + 7.",  
            options: [
              "A. 1",
              "B. 2",
              "C. 7/3",
              "D. 4"
            ], 
            answer: "B"  
            // The vertex x-coordinate is -b/(2a) = 12/(6) = 2.
          },
          { 
            type: "mcq", 
            question: "Find the value of k such that the quadratic equation x² + kx + k = 0 has a repeated (double) root.",  
            options: [
              "A. 0",
              "B. -4",
              "C. 4",
              "D. 2"
            ], 
            answer: "C"  
            // For a repeated root, discriminant must be zero: k² - 4k = 0 ⟹ k(k-4) = 0. Since k = 0 gives a trivial quadratic, k = 4 is the non-zero solution.
          },
        ];     
    
    
    
        
        // Add these questions to your existing questions array
      //  questions.push(...additionalQuestions);];

    function selectRandomQuestions() {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, totalQuestions);
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form refresh
        
        const matricNo = document.getElementById("matric-no").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (matricNo === "" || password === "") {
            alert("Please enter both Matric No and Password.");
            return;
        }
    
        userMatric.textContent = matricNo;
        userMatricTest.textContent = matricNo;
        
        
        // Hide home page and show instructions page
        homePage.classList.add("hidden");
        instructionsPage.classList.remove("hidden");
    });
    

    startTestBtn.addEventListener("click", () => {
        instructionsPage.classList.add("hidden");
        testPage.classList.remove("hidden");
        selectRandomQuestions();
        document.body.prepend(timerDisplay);
        startTimer();
        generateQuestionIcons();
        loadQuestion();
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    function generateQuestionIcons() {
        questionIconsDiv.innerHTML = "";
        for (let i = 1; i <= totalQuestions; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("question-btn");
            btn.addEventListener("click", () => {
                currentQuestion = i;
                loadQuestion();
            });
            questionIconsDiv.appendChild(btn);
        }
    }

    function loadQuestion() {
        const q = selectedQuestions[currentQuestion - 1];
        questionText.textContent = `Question ${currentQuestion}: ${q.question}`;
        optionsDiv.innerHTML = "";

        if (q.type === "mcq") {
            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                label.appendChild(input);
                label.append(option);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement("br"));
            });
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "fill-answer";
            optionsDiv.appendChild(input);
        }
    }

    saveButton.addEventListener("click", () => {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        const fillAnswer = document.getElementById("fill-answer");

        if (selectedOption) {
            answers[currentQuestion] = selectedOption.value;
        } else if (fillAnswer) {
            answers[currentQuestion] = fillAnswer.value;
        }

        updateQuestionIconColor();
    });

    function updateQuestionIconColor() {
        document.querySelectorAll(".question-btn").forEach((btn, index) => {
            if (answers[index + 1]) {
                btn.style.backgroundColor = "blue";
                btn.style.color = "white";
            }
        });
    }


    submitButton.addEventListener("click", submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        testPage.classList.add("hidden");

        let correctAnswers = 0;
        reviewPage.innerHTML = "<h2>Test Submitted! Review Your Answers</h2>";

        selectedQuestions.forEach((q, index) => {
            const userAnswer = answers[index + 1] || "Not Answered";
            const isCorrect = q.type === "mcq" 
                ? (userAnswer.charAt(0).toUpperCase() === q.answer.toUpperCase())
                : (userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase());

            if (isCorrect) correctAnswers++;

            reviewPage.innerHTML += `
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.options[q.answer.charCodeAt(0) - 65]}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">
                    ${isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
            `;
        });

        reviewPage.innerHTML = `<h3>You scored ${correctAnswers} out of ${totalQuestions}.</h3>` + reviewPage.innerHTML;
        document.body.appendChild(reviewPage);
        alert("Test submitted! Check your results.");

        // Create an anchor element for the solution link
        const solutionLink = document.createElement('a');
        solutionLink.href = 'https://t.me/cyflibrary/2/1750'; // URL to your solution page or file
        solutionLink.textContent = 'View Full Solution';

        // Optionally, style the link so it appears at the bottom or centered
        solutionLink.style.display = 'block';
        solutionLink.style.textAlign = 'center';
        solutionLink.style.marginTop = '20px';

        // Append the link directly to the body so it appears after other content
        document.body.appendChild(solutionLink);

    }

    document.getElementById("next").addEventListener("click", () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            loadQuestion();
        }
    });

    document.getElementById("prev").addEventListener("click", () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            loadQuestion();
        }
    });


    
});
