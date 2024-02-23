const qTypes = ["number", "Number", "radio", "text", "ScoreBox", "ScoreBox", "radio", "ScoreBox", "ScoreBox", "ScoreBox", "radio", "radio", "radio", "radio", "radio", "radio", "text", "radio", "text"]

fetch('https://docs.google.com/forms/d/e/1FAIpQLScKWVyi2PGa6mAVWpVRgmafDSUgNhLeZq44u5P-TDm4A_yEqw/viewform')
    .then(response => response.text())
    .then(htmlContent => {
        let FormData = htmlContent.split('var FB_PUBLIC_LOAD_DATA_ =')[1].split(';')[0]
        FormData = JSON.parse(FormData)

        let formData = {}

        let QuestionsData = FormData[1][1]

        let QuestionCodeCounter = 0;
        let QuestionCounter = 0;

        let currentStage = "not a title, title is undefined"

        for (let i = 0; i < QuestionsData.length; i++) {

            let FieldTitle = QuestionsData[i][1]
            let QuestionEntry = null

            if (QuestionsData[i][4] !== null){
                QuestionEntry = QuestionsData[i][4][0][0]

                formData[currentStage][QuestionCodeCounter] = {}
                formData[currentStage][QuestionCodeCounter]['title'] = FieldTitle
                formData[currentStage][QuestionCodeCounter]['entry'] = QuestionEntry
                formData[currentStage][QuestionCodeCounter]['answer'] = null

                if(QuestionsData[i][4][0][1] !== null){
              
                    formData[currentStage][QuestionCodeCounter]['type'] = "radio"

                    formData[currentStage][QuestionCodeCounter]['options'] = []

                    for (let j = 0; j < QuestionsData[i][4][0][1].length; j++){

                        formData[currentStage][QuestionCodeCounter]['options'][j] = QuestionsData[i][4][0][1][j][0]

                    }


                } else {
                    formData[currentStage][QuestionCodeCounter]['type'] = qTypes[QuestionCounter]
                }
              
                QuestionCodeCounter++
                QuestionCounter++
            } else {

                currentStage = FieldTitle
                QuestionCodeCounter = 0
                formData[currentStage] = []
            }
        }

        console.log(JSON.stringify(formData))

    })
    .catch(error => {
        console.error('Error fetching HTML content:', error);
    });
