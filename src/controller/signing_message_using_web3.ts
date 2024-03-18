import { Request, Response } from "express";
import Web3 from "web3";
import * as dotenv from "dotenv";
import { singularize } from "sequelize/types/utils";

class SignMessageWeb3{

  constructor(){
    dotenv.config();
  }
  
    async signWeb3(req : Request , res : Response) { 
        try {

            const web3 = new Web3(
                new Web3.providers.HttpProvider(process.env.RPC as string)
              );

            const gpk: string =
            process.env.GUARDIAN_1_PRIVATE_KEY!;

            let {message} = req.body;

            console.log(await web3.eth.getChainId())
           let account =  web3.eth.accounts.privateKeyToAccount(gpk);
            let sign  =  web3.eth.accounts.sign("happy" , gpk);

            let recover = await web3.eth.accounts.recover({
              messageHash: '0x1f73e9e38c9f1c0c7c1f7d778ed3b8d8a8675f6af8795037eaab27463c0eb7f7',
              v: '0x1c',
              r: '0x11eba4c0c236a1ba4181b8c443bdcb060292ab2697d1e9aef23d8d305538ffbf',
              s: '0x6ac92a1e68ff6edfde7a3bf57204fc558c3c4bfa27df3c540898eccb76b1a2c7',
            });

            console.log(recover , "recover")

          
            let recover_message = await web3.eth.accounts.recover({
              messageHash: '0x1f73e9e38c9f1c0c7c1f7d778ed3b8d8a8675f6af8795037eaab27463c0eb7f7',
              v: '0x1c',
              r: '0x11eba4c0c236a1ba4181b8c443bdcb060292ab2697d1e9aef23d8d305538ffbf',
              s: '0x6ac92a1e68ff6edfde7a3bf57204fc558c3c4bfa27df3c540898eccb76b1a2c7',
            });

            const prvt_key = '1d0350390ccbec7bb44d6a28bfc7f1a2189717e9627f69236d13a5f555fee176';

          // Convert public key to address
             const address = web3.eth.accounts.privateKeyToAccount(prvt_key);
  
                console.log(web3.eth.accounts.create() ,"acccountttttt")
             
             console.log(address , "address")
           
         
         res.status(200).json({
            message  ,
    
         });
        } catch (error) {
         console.error(error);
         res.status(500).json({
           status: "error",
           message: "An error occurred while processing the request.",
         });
       }
     }


}

export default new SignMessageWeb3();