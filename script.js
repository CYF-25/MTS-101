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
    const totalQuestions = 20;
    let timeLeft = 20 * 60;
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

        // Append the link directly to the body to appear after other content
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
