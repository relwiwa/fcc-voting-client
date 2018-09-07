import PollOption from './PollOption';

class Poll {
  constructor(question = '', options = [new PollOption(), new PollOption()], creationDate = new Date(), pollId = null) {
    this.question = question;
    this.options = options;
    this.creationDate = creationDate;
    this.pollId = pollId;
  }
};

export default Poll;
