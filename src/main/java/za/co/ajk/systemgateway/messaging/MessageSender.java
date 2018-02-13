package za.co.ajk.systemgateway.messaging;

public interface MessageSender {

    void sendTestMessage() throws Exception;
    
    void sendObjMessage(InterModulePubSubMessage interModulePubSubMessage);
}
