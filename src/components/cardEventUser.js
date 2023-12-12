import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, StyleSheet, Text } from "react-native"
import axios from "axios";

const CardEventUser = ({descricaoEvento, idUser, Nm_event, Event_image, Id_App_Events}) => {
    const navigation = useNavigation()
    
    console.log(Id_App_Events); 
    console.log(idUser); 

    return (
        <Pressable 
            style={styles.containerEventos} 
            onPress={()=>{
                axios.post("http://localhost:3003/EventAcess", {
                Id_user_code: idUser,
                Id_App_Events_code: Id_App_Events,
                });
                navigation.navigate("evento", { idEvento: Id_App_Events, id : idUser, imgProfile: Event_image });
            }}
        >
            <Image
                source={`data:image/png;base64,${Event_image}`}
                style={styles.userImage}
            />
            
            <Text style={styles.containerEventosText}>{Nm_event}</Text>
            <Text style={styles.containerEventosText}>{descricaoEvento}</Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({ 
    userImage: {
		width: 124,
		height: 80,
		borderRadius: 8,
		backgroundColor: "black",
	},
	containerEventos: {
		flexDirection: "row",
		gap: 8,

	},
	containerEventosText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		textTransform: "capitalize"
	},
})
export default CardEventUser