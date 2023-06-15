(() => {
    window.addEventListener("load", () => {
        console.log("loading quiz-controller.")
        const quizControl = document.querySelector("div.quiz-control");
        const answerElement = document.querySelectorAll(".quiz-answer");
        const answerInput = quizControl.querySelector("input#answer");
        const checkBtn = quizControl.querySelector("button#check");
        const toggleAnswerBtn = quizControl.querySelector("div.toggle-answer");
        const prompts = quizControl.querySelector("div.prompts");

        if(!("quiz_plugin_answer" in window)) {
            quizControl.remove();
            console.error("error loading quiz-controller.");
            console.error("answer is not set correctly. please set answer in window.quiz_plugin_answer.");
            return;
        }

        const answer = window.quiz_plugin_answer;

        let isAnswerVisible = false;

        const setAnswerVisible = (visible = true) => {
            for(const e of answerElement) {
                if(visible) {
                    e.classList.add("quiz-answer-visible");
                } else {
                    e.classList.remove("quiz-answer-visible");
                }
            }
        };

        const toggleAnswerVisible = () => {
            isAnswerVisible = !isAnswerVisible;
            setAnswerVisible(isAnswerVisible);
        };

        toggleAnswerBtn.addEventListener("click", () => {
            toggleAnswerVisible();
            if(isAnswerVisible) {
                toggleAnswerBtn.classList.add("answer-visible");
            } else {
                toggleAnswerBtn.classList.remove("answer-visible");
            }
        });

        checkBtn.addEventListener("click", () => {
            prompts.classList.remove("d-none");
            if(answer === answerInput.value) {
                checkBtn.disabled = true;
                answerInput.disabled = true;
                toggleAnswerBtn.classList.add("d-none");
                prompts.classList.add("correct");
                setAnswerVisible();
            }
        });
    });
})();