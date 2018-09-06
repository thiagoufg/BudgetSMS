import * as application from "application";
import { TransactionDao } from "~/shared/dao/transaction.dao";
import { DataBase } from "../sqlite/db";
import { Transaction } from "../shared/model/transaction";
var Sqlite = require("nativescript-sqlite");

//@JavaProxy("IncomingSmsBroadcastReceiver")
@JavaProxy("com.thiago.broadcastreceivers.IncomingSmsBroadcastReceiver")
class IncomingSmsBroadcastReceiver extends android.content.BroadcastReceiver {
    public onReceive(context: android.content.Context, intent: android.content.Intent) {

        //const utils = require("utils/utils");
        //helper.setupAlarm(utils.ad.getApplicationContext());

        if (intent.getAction() !== "android.provider.Telephony.SMS_RECEIVED") {
            return;
        }

        let messages: Object[];

        try {
            messages = <any>intent.getSerializableExtra("pdus");
        }
        catch (e) {
            //log
            return;
        }

        const format: string = intent.getStringExtra("format");

        //android.telephony.SmsMessage[]
        //let smsMessages = [];//android.telephony.SmsMessage.Intents.getMessagesFromIntent(intent);

        const transactionDao = new TransactionDao(null);

        for (let i = 0; i < messages.length; i++) {
            const message = android.telephony.SmsMessage.createFromPdu(messages[i] as Array<number>);
            /*
                if (message.getDisplayOriginatingAddress() === AppConfig.boxPhoneNumber) {
                    const intent = new android.content.Intent(AppConfig.incomingSmsIntent);
                    intent.putExtra("message", message.getMessageBody())
                    context.getApplicationContext().sendBroadcast(intent);
                }
            */
            console.log("SmsReceiver", "senderNum: " + message.getDisplayOriginatingAddress() + "; message: " + message.getMessageBody());
            const transaction = new Transaction();
            transactionDao.add(transaction);
        }
    }
}
