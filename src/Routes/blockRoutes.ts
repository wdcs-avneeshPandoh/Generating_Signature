import { Router } from "express"; // Import 'express' and 'Router' from 'express'
import ptb from "../controller/ptb";
import signMessage from "../controller/signing_message";
import signMessageWeb3 from "../controller/signing_message_using_web3";

const router: Router = Router(); // Create a router instance

router.post("/foucet-devnet", ptb.get_devnet_sui);
router.post("/programmableTxBlocks", ptb.ptb);
router.post("/signing_msg", signMessage.sign);
router.post("/signing_msg_web3", signMessageWeb3.signWeb3);

export default router;
