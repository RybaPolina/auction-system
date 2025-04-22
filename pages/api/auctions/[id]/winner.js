import nc from "next-connect";
import { getWinner } from "../../../../controllers/auctionController";

export default nc().get(getWinner);
