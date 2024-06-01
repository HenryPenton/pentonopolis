import { State } from "../../../State/State";
import { LocalResponse } from "../LocalResponse";

export class GetVotesResponse extends LocalResponse {
  noVotesResponse: string;
  constructor(state: State) {
    super(state);
    this.noVotesResponse = "Could not find any votes";
  }

  fire = (): string => {
    const movieVotes = this.state
      .getPolls()
      .sort((a, b) => b.voter_count - a.voter_count);

    let currentMaxVote = 0;
    let allVotes = "";

    for (const vote of movieVotes) {
      const { text, voter_count } = vote;
      const numberOfVotes = voter_count;

      const noVotes = numberOfVotes === 0;
      if (noVotes) continue;

      const pluralised = numberOfVotes > 1 ? "votes" : "vote";

      if (currentMaxVote !== voter_count) {
        currentMaxVote = voter_count;
        allVotes += `<b><u>${currentMaxVote} ${pluralised}:</u></b>\n`;
      }

      allVotes += `${text}\n`;
    }

    if (allVotes === "") {
      return this.noVotesResponse;
    }

    return allVotes;
  };
}
