import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, StyleSheet, Text } from "react-native"

const CardEvent = ({descricaoEvento, idUser, Nm_event, Event_image, Id_App_Events}) => {
    const navigation = useNavigation()
    console.log(Id_App_Events);

    return (
        <Pressable 
            style={styles.containerEventos} 
            onPress={()=>{
                navigation.navigate("eventoedit", { idEvento: Id_App_Events, id : idUser, imgProfile: Event_image });
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
        right: 100,
        top: 130,
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
export default CardEvent