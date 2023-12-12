import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, StyleSheet, Text } from "react-native"
import axios from "axios";

const CardUsersSearch = ({descricaoEvento, idUser, Nm_user, User_image, Id_App_Events}) => {
    const navigation = useNavigation()


    return (
        <Pressable 
            style={styles.containerEventos} 
            onPress={()=>{
                axios.post("http://localhost:3003/EventAcess", {
                Id_user_code: idUser,
                Id_App_Events_code: Id_App_Events,
                });
                navigation.navigate("otherprofile", { idUser : idUser});
            }}
        >
            <Image
                source={`data:image/png;base64,${User_image}`}
                style={styles.userImage}
            />
            
            <Text style={styles.containerEventosText}>{Nm_user}</Text>
            {/* <Text style={styles.containerEventosText}>{descricaoEvento}</Text> */}

        </Pressable>
    )
}

const styles = StyleSheet.create({ 
    userImage: {
		width: 80,
		height: 80,
		borderRadius: 9999,
		backgroundColor: "black",
	},
	containerEventos: {
		flexDirection: "row",
        alignItems: "center",
		gap: 16,

	},
	containerEventosText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		textTransform: "capitalize"
	},
})
export default CardUsersSearch