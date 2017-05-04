import * as application from "application";

//@JavaProxy("IncomingSmsBroadcastReceiver")
@JavaProxy("com.xxxxx.beeper.broadcastreceivers.IncomingSmsBroadcastReceiver")
class IncomingSmsBroadcastReceiver extends android.content.BroadcastReceiver   {
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
            console.log("SmsReceiver", "senderNum: "+ message.getDisplayOriginatingAddress() + "; message: " + message.getMessageBody());
        }
    }
}
