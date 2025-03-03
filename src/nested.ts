import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    //WORKING
    let published: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    //WORKING
    let newQuestions: Question[] = questions.filter(
        (question: Question): boolean =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length !== 0,
    );
    return newQuestions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    //WORKING
    let index: number = questions.findIndex(
        (question: Question) => question.id == id,
    );
    if (index !== -1) {
        return questions[index];
    }
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    //WORKING
    let newQuestions: Question[] = questions.filter(
        (question: Question) => question.id != id,
    );
    return newQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    //WORKING
    let names: string[] = questions.map((question: Question) => question.name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    //WORKING
    let points: number[] = questions.map(
        (question: Question) => question.points,
    );
    return points.reduce((points: number, total: number) => points + total, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    //WORKING
    let filtered: Question[] = questions.filter(
        (question: Question) => question.published,
    );
    let points: number[] = filtered.map(
        (question: Question) => question.points,
    );
    let sum: number = points.reduce(
        (points: number, total: number) => points + total,
        0,
    );
    return sum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let CSV =
        "id,name,options,points,published\n" +
        questions
            .map(
                (question: Question): string =>
                    `${question.id},${question.name},${question.options.length},${question.points},${question.published}`,
            )
            .join("\n");
    return CSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    //WORKING
    let answers: Answer[] = questions.map((question: Question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false,
    }));
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    //WORKING
    let published = questions.map((question: Question) =>
        !question.published ? { ...question, published: true } : question,
    );
    return published;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    //WORKING
    if (questions.length == 0) {
        return true;
    }
    if (questions[0].type == "multiple_choice_question") {
        return questions.every(
            (question: Question): boolean =>
                question.type == "multiple_choice_question",
        );
    } else {
        return questions.every(
            (question: Question): boolean =>
                question.type == "short_answer_question",
        );
    }
    return false;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    //WORKING
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    //WORKING
    let newQuestions: Question[] = questions.map((question: Question) =>
        question.id == targetId ? { ...question, name: newName } : question,
    );
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    //WORKING
    if (newQuestionType !== "multiple_choice_question") {
        let newQuestions: Question[] = questions.map((question: Question) =>
            question.id == targetId ?
                { ...question, type: newQuestionType, options: [] }
            :   question,
        );
        return newQuestions;
    }
    let newQuestions: Question[] = questions.map((question: Question) =>
        question.id == targetId ?
            { ...question, type: newQuestionType }
        :   question,
    );

    return newQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    //WORKING
    let newQuestions = questions.map((question: Question) =>
        question.id == targetId ?
            {
                ...question,
                options:
                    targetOptionIndex == -1 ?
                        [...question.options, newOption]
                    :   question.options.map((option: string, index: number) =>
                            index == targetOptionIndex ? newOption : option,
                        ),
            }
        :   question,
    );

    return newQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    //WORKING
    let index = questions.findIndex(
        (question: Question) => question.id == targetId,
    );
    let newQuestion = duplicateQuestion(newId, { ...questions[index] });
    let newQuestions: Question[] = questions.map(
        (question: Question) => question,
    );
    newQuestions.splice(index + 1, 0, newQuestion);
    return newQuestions;
}
