import { StyleSheet } from "react-native"
import COLORS from "../../constant/colors"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBackground,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.inputBackground,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subContianer: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 50
  },
  image: {
    width: 300,
    height: 300
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    elevation: 6,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40


  },
  inputheading: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 10,
    marginTop: 22
  },
  inputView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height:60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBackground,
    paddingHorizontal: 13,
  

  },
  inputText1: {
    width: "100%",
    fontSize: 19,
    marginStart: 10,
    marginEnd:20
  },
  buttonContainer: {
    width: "110%",
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    marginTop: 40
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textStyleBottom: {
    fontSize: 17,
    fontWeight: "semibold",
    marginEnd: 10,
    marginTop: 30,
    marginBottom: 40
  }
})
