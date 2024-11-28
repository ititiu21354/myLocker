import org.eclipse.paho.client.mqttv3.*;

public class MqttConnection {
    public static void main(String[] args) {
        String broker = "tcp://broker.hivemq.com:1883"; // WSS protocol for secure WebSocket
        String clientId = "JavaClient"; // Unique client ID

        ///////////////////////////////////////////
        //our project has 4 locker with topic: rpi/locker1, rpi/locker2, rpi/locker3, rpi/locker4
        String topic = "rpi/locker1";
        ///////////////////////////////////////////

        try {
            // Create MQTT client
            MqttClient client = new MqttClient(broker, clientId);

            // Callback for MQTT events
            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    System.out.println("Connection lost: " + cause.getMessage());
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    System.out.println("Message arrived: " + new String(message.getPayload()));
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {
                    System.out.println("Delivery complete");
                }
            });

            // Connection options
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setUserName("your_username"); // Replace with your username if required
            options.setPassword("your_password".toCharArray()); // Replace with your password if required

            // Connect to the broker
            client.connect(options);
            System.out.println("Connected to broker: " + broker);

            // Subscribe to a topic
            client.subscribe(topic);
            System.out.println("Subscribed to topic: " + topic);

            // Publish a message
            // 2 types of message in our project: "on" - to open , "off" - to lock
            String messageContent = "off";
            MqttMessage message = new MqttMessage(messageContent.getBytes());
            message.setQos(1);
            client.publish(topic, message);
            System.out.println("Message published: " + messageContent);

            // Disconnect
            Thread.sleep(5000);
            client.disconnect();
            System.out.println("Disconnected");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
