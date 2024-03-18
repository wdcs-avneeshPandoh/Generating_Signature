import { Request, Response } from "express";
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet';
import { TransactionBlock } from '@mysten/sui.js/transactions';
 



class ProgrammableTxBlocks {

  async ptb(req : Request , res : Response) { 
    try {
     const txb = new TransactionBlock();
     txb.moveCall({
        target: '0x2::pay::split',
        typeArguments: ['0x2::sui::SUI'],
        arguments: [txb.object("0x7b85b855d8a0f4162f8f6abee96b78b09cf405208a14a1dfa607c8a150e0f548"), txb.pure.u64(10)],
      });
      
      
      // const [coin] = txb.splitCoins(txb.gas, [100]);
      //  console.log(coin , "coinnn")
      // // transfer the split coin to a specific address
      // txb.transferObjects([coin], '0x0b6ffe868b9b236cbf29316a277ff891e368facf8975e146c950b137f0268adc');
     
     res.status(200).json({
       message: "ptb"
     });
    } catch (error) {
     console.error(error);
     res.status(500).json({
       status: "error",
       message: "An error occurred while processing the request.",
     });
   }
 }
  async get_devnet_sui(req : Request , res : Response) {
   try {
    await requestSuiFromFaucetV0({
      host: getFaucetHost('devnet'),
      recipient: "0x5557467a0cfac6417db97f8525a4c189c30bc63fca2032943ba76c6a13000baf",
    });
    res.status(200).json({
      message: "Sui deposited"
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

export default new ProgrammableTxBlocks();
