class Poll {
  constructor(question = '', options = ['', ''], creationDate = new Date(), pollId = null) {
    this.question = question;
    this.options = options;
    this.creationDate = creationDate;
    this.pollId = pollId;
  }
};

export default Poll;
