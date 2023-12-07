import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	ImageBackground,
	Pressable,
	Dimensions,
	Platform,
	Animated,
	Easing,
} from "react-native";
import axios from "axios";
import Like from "../assets/images/icons/liked.png"
import Liked from "../assets/images/icons/like.png"


export default function Navbuttons({ siteInfo, id, idEvent, numCurtida,setNumCurtida, numPresence, setNumPresence }) {
	const [buttonVisible, setButtonVisible] = useState(true);
	const [likeButtonText, setLikeButtonText] = useState("Curtir");
	const [presenceButtonText, setPresenceButtonText] = useState("Agendar");
	const [isLikeButtonPressed, setIsLikeButtonPressed] = useState(false);
	const [isPresenceButtonPressed, setIsPresenceButtonPressed] = useState(false);
	const spinValueLike = new Animated.Value(0);
	const spinValuePresence = new Animated.Value(0);
	const [likeImage, setLikeImage] = useState(
		require("../assets/images/icons/like.png")
	);
	const [presenceImage, setPresenceImage] = useState(
		require("../assets/images/icons/calendar_time.png")
	);

	const spinLike = spinValueLike.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const spinPresence = spinValuePresence.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	
	const startLikeAnimation = () => {
		Animated.timing(spinValueLike, {
			toValue: 1,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			setIsLikeButtonPressed(false);
			setLikeImage((prev) =>
				prev === require("../assets/images/icons/like.png")
					? require("../assets/images/icons/liked.png")
					: require("../assets/images/icons/like.png")
			);
			spinValueLike.setValue(0);
			setLikeButtonText((prev) => (prev === "Curtir" ? "Curtido" : "Curtir"));
		});
	};

	const startPresenceAnimation = () => {
		Animated.timing(spinValuePresence, {
			toValue: 1,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			setIsPresenceButtonPressed(false);
			setPresenceImage((prev) =>
				prev === require("../assets/images/icons/calendar_time.png")
					? require("../assets/images/icons/calendar_finished.png")
					: require("../assets/images/icons/calendar_time.png")
			);
			spinValuePresence.setValue(0);
			setPresenceButtonText((prev) =>
				prev === "Agendar" ? "Agendado" : "Agendar"
			);
		});
	};

	// const handleLikeButtonPress = () => {
	// 	setIsLikeButtonPressed(true);
	// 	startLikeAnimation(spinValueLike, setIsLikeButtonPressed, setLikeImage);
	// };

	
	const dados = {
		eventId_code:idEvent,
		userId_code: id,
		Id_App_Events_code: idEvent

	}

	const handlePresenceButtonPress = () => {
		axios
		.post('http://localhost:3003/confirmPresence', dados)
		.then((response) => {
			console.log(response);
			axios.post('http://localhost:3003/presenceCount', dados)
				.then((response) => {
				console.log(response) 
				setNumPresence(response.data.numberPresence)
				console.log("deu cie" + numPresence)
				
			})
		.catch((error) => {
			console.error("Erro ao enviar os dados para o backend:", error);
		})
		})
		.catch((error) => {
		  console.error(
			"Erro ao enviar ou retono de dados para o backend:",
			error
		  );
		});
		
		setIsPresenceButtonPressed(true);
		startPresenceAnimation(
			spinValuePresence,
			setIsPresenceButtonPressed,
			setPresenceImage
		);
	};

	const handleThirdButtonPress = () => {
		console.log("Terceiro botão pressionado");
	};

	const handleFourthButtonPress = () => {
		console.log("Quarto botão pressionado");
	};

	const onShare = async () => {
		try {
			const result = await Share.share({
				message: `Venha conhecer nosso evento!\n${siteInfo}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	const like = {
		Id_user_code: id,
		Id_App_Events_code: idEvent
	}

	const startAnimation = (toggleLike) => {
		const image = toggleLike ? Like : Liked
		console.log(toggleLike);
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {

			setIsButtonPressed(false);
			setLikeImage(image);
			spinValue.setValue(0);
		});
	};


	const [toggleLikeControll, setToggleLikeControll] = useState(false)
	const spinValue = new Animated.Value(0);
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	

	useEffect(()=>{
		axios.post('http://localhost:3003/heartLikeEvent', like)
		.then((response) => {
			console.log(response) 
			setToggleLikeControll(response.data.heartLikeEvent)
			startAnimation(response.data.heartLikeEvent)
		})
		.catch((error) => {
			console.error("Erro ao enviar os dados para o backend:", error);
		})

		
	},[])
		
	
	
	const handleButtonPress = () => {
		startAnimation(!toggleLikeControll)
		setToggleLikeControll(!toggleLikeControll)

		axios.post('http://localhost:3003/likeEvent', like)
			.then((response) => {
				console.log(response);
				axios
					.post('http://localhost:3003/likeCount', like)
					.then((response) => {
						console.log(response);
						setNumCurtida(response.data.numberLikes)
					}).then(() => {
						console.log("funfo " + numCurtida);
					})
					.catch((error) => {
						console.error('Erro ao enviar os dados para o backend:', error);

					});
			})
			.catch((error) => {
				console.error('Erro ao enviar os dados para o backend:', error);
			})
			startLikeAnimation
	// startLikeAnimation(spinValueLike, setIsLikeButtonPressed, setLikeImage);
	}


	return (
		<View>
			{buttonVisible && (
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.customButton}
						onPress={handleButtonPress}>
						<Animated.Image
							source={likeImage}
							style={[
								styles.icon,
								{
									transform: [{ rotate: `${spinLike._value}deg` }],
									transition: "transform 0.3s ease-in-out",
								},
							]}
						/>
						<Text style={styles.buttonTitle}>{likeButtonText}</Text>
					</Pressable>

					<Pressable
						style={styles.customButton}
						onPress={handlePresenceButtonPress}>
						<Animated.Image
							source={presenceImage}
							style={[
								styles.icon,
								{
									transform: [{ rotate: `${spinPresence._value}deg` }],
									transition: "transform 0.3s ease-in-out",
								},
							]}
						/>
						<Text style={styles.buttonTitle}>{presenceButtonText}</Text>
					</Pressable>

					<Pressable
						style={styles.customButton}
						onPress={handleThirdButtonPress}>
						<Image
							source={require("../assets/images/icons/locate.png")}
							style={styles.icon}
						/>
						<Text style={styles.buttonTitle}>Localização</Text>
					</Pressable>

					<Pressable style={styles.customButton} onPress={onShare}>
						<Image
							source={require("../assets/images/icons/share.png")}
							style={styles.icon}
						/>
						<Text style={styles.buttonTitle}>Compartilhar</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
	// export default function Navbuttons() {
	// 	const [buttonVisible, setButtonVisible] = useState(true);
	// 	const [isButtonPressed, setIsButtonPressed] = useState(false);
	// 	const spinValue = new Animated.Value(0);
	// 	const navigation = useNavigation();
	// 	const [likeImage, setLikeImage] = useState("");
	// 	const [numCurtida, setNumCurtida] = useState("");

	// 	const [toggleLikeControll, setToggleLikeControll] = useState(false)

	// 	const spin = spinValue.interpolate({
	// 		inputRange: [0, 1],
	// 		outputRange: ["0deg", "360deg"],
	// 	});

	// 	const startAnimation = (toggleLike) => {
	// 		const image = toggleLike ? Like : Liked
	// 		console.log(toggleLike);
	// 		Animated.timing(spinValue, {
	// 			toValue: 1,
	// 			duration: 100,
	// 			easing: Easing.linear,
	// 			useNativeDriver: true,
	// 		}).start(() => {

	// 			setIsButtonPressed(false);
	// 			setLikeImage(image);
	// 			spinValue.setValue(0);
	// 		});
	// 	};

	// 	const route = useRoute();
	// 	const { id } = route.params;
	// 	const { idEvento } = route.params;
	// 	console.log(id, idEvento);

	// 	const like = {
	// 		Id_user_code: id,
	// 		Id_App_Events_code: idEvento
	// 	}



	// 	useEffect(()=>{
	// 		axios.post('http://localhost:3003/heartLikeEvent', like)
	// 		.then((response) => {
	// 			console.log(response)
	// 			setToggleLikeControll(response.data.heartLikeEvent)
	// 			startAnimation(response.data.heartLikeEvent)
	// 		})
	// 		.catch((error) => {
	// 			console.error("Erro ao enviar os dados para o backend:", error);
	// 		})
	// 	},[])

	// 	const handleButtonPress = () => {
	// 		startAnimation(!toggleLikeControll)
	// 		setToggleLikeControll(!toggleLikeControll)

	// 		axios.post('http://localhost:3003/likeEvent', like)
	// 			.then((response) => {
	// 				console.log(response);
	// 				axios
	// 					.post('http://localhost:3003/likeCount', like)
	// 					.then((response) => {
	// 						console.log(response);
	// 						setNumCurtida(response.data.numberLikes)
	// 					}).then(() => {
	// 						console.log("funfo " + numCurtida);
	// 					})
	// 					.catch((error) => {
	// 						console.error('Erro ao enviar os dados para o backend:', error);

	// 					});
	// 			})
	// 			.catch((error) => {
	// 				console.error('Erro ao enviar os dados para o backend:', error);
	// 			})
	// 	};

	// 	const handleSecondButtonPress = () => {
	// 		navigation.navigate("comentario");
	// 	};

	// 	const handleThirdButtonPress = () => {
	// 		console.log("Terceiro botão pressionado");
	// 	};

	// 	const handleFourthButtonPress = () => {
	// 		console.log("Quarto botão pressionado");
	// 	};

	// 	useEffect(() => {
	// 		0,
	// 		axios
	// 			.post('http://localhost:3003/likeCount', like)
	// 			.then((response) => {
	// 				console.log(response);
	// 				setNumCurtida(response.data.numberLikes)
	// 			})
	// 			.catch((error) => {
	// 				console.error('Erro ao enviar os dados para o backend:', error);

	// 			});
	// 		console.log("funfo " + numCurtida);
	// 	}, []);
	// 	return (
	// 		<View>
	// 			{buttonVisible && (
	// 				<View style={styles.buttonContainer}>
	// 					<Pressable
	// 						style={styles.customButton}
	// 						onPress={handleButtonPress}>
	// 						<Animated.Image
	// 							source={likeImage}
	// 							style={[styles.icon, { transform: [{ rotate: spin }] }]}
	// 						/>
	// 						<Text style={styles.buttonTitle}>Curtir</Text>
	// 						<Text style={styles.buttonTitle}>{numCurtida}</Text>
	// 					</Pressable>

	// 					<Pressable
	// 						style={styles.customButton}
	// 						onPress={handleSecondButtonPress}>
	// 						<Image
	// 							source={require("../assets/images/icons/comment.png")}
	// 							style={styles.icon}
	// 						/>
	// 						<Text style={styles.buttonTitle}>Comentar</Text>
	// 					</Pressable>

	// 					<Pressable
	// 						style={styles.customButton}
	// 						onPress={handleThirdButtonPress}>
	// 						<Image
	// 							source={require("../assets/images/icons/locate.png")}
	// 							style={styles.icon}
	// 						/>
	// 						<Text style={styles.buttonTitle}>Localização</Text>
	// 					</Pressable>

	// 					<Pressable
	// 						style={styles.customButton}
	// 						onPress={handleFourthButtonPress}>
	// 						<Image
	// 							source={require("../assets/images/icons/share.png")}
	// 							style={styles.icon}
	// 						/>
	// 						<Text style={styles.buttonTitle}>Compartilhar</Text>
	// 					</Pressable>
	// 				</View>
	// 			)}
	// 		</View>
	// 	);
	// }
}

	const styles = StyleSheet.create({
		buttonContainer: {
			flexDirection: "row",
			justifyContent: 'space-between',
			alignItems: 'center',
			top: 100,
			left: 0,
			marginHorizontal: 12,
		},

		customButton: {
			marginHorizontal: 10,
		},

		buttonTitle: {
			flexDirection: 'row',
			right: 5,
			top: 12,
			color: "white",
			fontSize: 12,
			marginRight: -10,
			alignSelf: 'center',
		},

		icon: {
			width: 65,
			height: 65,
		},
	});