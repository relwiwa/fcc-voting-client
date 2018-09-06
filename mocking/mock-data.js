import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
import PollsItem from '../models/PollsItem';

export const mockPoll = {
  '325bcb5a-daa8-479f-8f4b-5109eff09c4f': new Poll(
    "Qui similique sit voluptates deserunt ipsa necessitatibus dolorem deserunt quas?",
    [
      new PollOption('a', 12),
      new PollOption('b', 9),
      new PollOption('c', 3),
    ],
    new Date("2018-08-01"),
    "325bcb5a-daa8-479f-8f4b-5109eff09c4f",
  ),
};

export const mockPollsList = [
  new PollsItem("Qui similique sit voluptates deserunt ipsa necessitatibus dolorem deserunt quas?", "325bcb5a-daa8-479f-8f4b-5109eff09c4f", 5, new Date("2018-08-01")),
  new PollsItem("Culpa ipsam voluptas?", "f8cd86e7-2877-4a4a-a4cc-931c59db8afa", 11, new Date("2018-06-30")),
  new PollsItem("Est aspernatur dolorem modi animi qui mollitia consequatur?", "31f1612a-893d-495a-bad6-c72fad04deb7", 1, new Date("2018-08-09")),
  new PollsItem("Blanditiis minus totam repellat totam quia?", "ab3d600b-7531-458e-91c1-7a999c314e3c", 13, new Date("2018-08-29")),
];
