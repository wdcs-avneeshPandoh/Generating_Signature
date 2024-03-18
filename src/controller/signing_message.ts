import { Request, Response } from "express";
import {
  AptosAccount,
  HexString,
  MaybeHexString,
} from "aptos";
import * as dotenv from "dotenv";

class SignMessage{

  constructor(){
    dotenv.config();
  }
  
    async sign(req : Request , res : Response) { 
        try {

            let {message} = req.body;
           
            const GUARDIAN_1_PRIVATE_KEY: MaybeHexString =
              process.env.GUARDIAN_1_PRIVATE_KEY!;
            const GUARDIAN_2_PRIVATE_KEY: MaybeHexString =
              process.env.GUARDIAN_2_PRIVATE_KEY!;
            const GUARDIAN_3_PRIVATE_KEY: MaybeHexString =
              process.env.GUARDIAN_3_PRIVATE_KEY!;
            
            // const GUARDIAN_4_PRIVATE_KEY: MaybeHexString =
            //   process.env.GUARDIAN_4_PRIVATE_KEY!;
            const CreateAccountFromPrivateKey = async (privateKey: MaybeHexString) => {

                let hexString = HexString.ensure(privateKey).toUint8Array();
                let account = new AptosAccount(hexString);
              
                return account;
              }; 

              let guardian1Account = await CreateAccountFromPrivateKey(
                GUARDIAN_1_PRIVATE_KEY
              );
              let guardian2Account = await CreateAccountFromPrivateKey(
                GUARDIAN_2_PRIVATE_KEY
              );
            
              let guardian3Account = await CreateAccountFromPrivateKey(
                GUARDIAN_3_PRIVATE_KEY
              );
            
              // let guardian4Account = await CreateAccountFromPrivateKey(
              //   GUARDIAN_4_PRIVATE_KEY
              // );
            
            
              const messageToSign = HexString.ensure(message).toString();
              console.log(messageToSign , "messageToSign");
            
              const signatureGuardian1 = guardian1Account.signHexString(messageToSign);
              console.log("signatureGuardian1", signatureGuardian1);
            
              const signatureGuardian2 = guardian2Account.signHexString(messageToSign);
              console.log("signatureGuardian2", signatureGuardian2);
            
              const signatureGuardian3 = guardian3Account.signHexString(messageToSign);
              console.log("signatureGuardian3", signatureGuardian3);
            
              // const signatureGuardian4 = guardian4Account.signHexString(messageToSign);
              // console.log("signatureGuardian4", signatureGuardian4);

              console.log(
                "x{$signatureGuardian1} ,"
              )
         
         res.status(200).json({
            message  ,
            signatureGuardian1 ,
            signatureGuardian2 ,
             signatureGuardian3 ,
            // signatureGuardian4
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

export default new SignMessage();