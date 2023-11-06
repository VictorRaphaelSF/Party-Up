import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, StyleSheet, Text } from "react-native"

const CardEvent = ({Nm_event,Event_image}) => {
    const navigation = useNavigation()
    return (
        <Pressable 
            style={styles.containerEventos} 
            onPress={()=>{
                navigation.navigate("evento", { id : props.id, imgProfile: props.imgProfile });
            }}
        >
            <Image
                source={`data:image/png;base64,${Event_image}`}
                style={styles.userImage}
            />
            <Text style={styles.containerEventosText}>{Nm_event}</Text>

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
export default CardEvent