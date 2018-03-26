package za.co.ajk.systemgateway.messaging;

public interface MessageSender {

    void sendIncidentTestMessage() throws Exception;
    
    void sendGenericMessage() throws Exception;
    
    void sendObjMessage(InterModulePubSubMessage interModulePubSubMessage);
}
