class PollsItem {
  constructor(question, pollId, numberOfVotes, creationDate) {
    this.question = question;
    this.pollId = pollId;
    this.numberOfVotes = numberOfVotes;
    this.creationDate = creationDate;
  }
}

export default PollsItem;
