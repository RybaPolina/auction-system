import nc from "next-connect";
import { endAuction } from "../../../../controllers/auctionController";

export default nc().post(endAuction);
