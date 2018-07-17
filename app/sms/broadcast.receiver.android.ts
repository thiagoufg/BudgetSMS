import * as application from "application";
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
            (new Sqlite("BudgetSMS.db")).then
                (
                db => {
                    db.execSQL("INSERT INTO transactions (name, amount) VALUES (?, ?)", [message.getDisplayOriginatingAddress(), message.getMessageBody()]).then
                        (
                        id => {
                            console.log("INSERT RESULT", id);
                        },
                        error => {
                            console.log("INSERT ERROR", error);
                        }
                        )
                },
                error => {
                    console.log("OPEN DB ERROR", error);
                }
                );

        }
    }
}