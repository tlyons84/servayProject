export interface answer {
  userId: string,
  useranswer:userAnswer[],
  servayId: number

}
export interface userAnswer{
  questionName: string,
  answer:string
}
