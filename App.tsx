import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { NUMEE_WEB_URL } from "./src/config";

const EXIT_CONFIRM_MS = 2000;
/** Splash / loading screen (matches NuMee marketing blue) */
const BRAND_BLUE = "#2b57a7";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const webRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);
  const lastBackPressRef = useRef(0);
  const errorRef = useRef<string | null>(null);
  errorRef.current = error;

  const onLoadEnd = useCallback(() => setLoading(false), []);
  const onError = useCallback(() => {
    setLoading(false);
    setError("Could not load NuMee. Check your connection and URL.");
  }, []);

  const onNavigationStateChange = useCallback(
    (navState: { canGoBack: boolean }) => {
      canGoBackRef.current = navState.canGoBack;
    },
    [],
  );

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const onBack = () => {
      if (!errorRef.current && webRef.current && canGoBackRef.current) {
        webRef.current.goBack();
        return true;
      }

      const now = Date.now();
      if (now - lastBackPressRef.current < EXIT_CONFIRM_MS) {
        BackHandler.exitApp();
        return true;
      }

      lastBackPressRef.current = now;
      ToastAndroid.show(
        "Press back again to exit",
        ToastAndroid.SHORT,
      );
      return true;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.root}>
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <WebView
          ref={webRef}
          source={{ uri: NUMEE_WEB_URL }}
          style={styles.webview}
          onLoadEnd={onLoadEnd}
          onError={onError}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
          allowsBackForwardNavigationGestures
          setSupportMultipleWindows={false}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          {...(Platform.OS === "ios"
            ? ({
                mediaCapturePermissionGrantType: "grantIfSameHostElsePrompt",
              } as const)
            : {})}
        />
      )}

      {loading && !error ? (
        <View style={styles.loadingScreen}>
          <Image
            source={require("./assets/numee-logo.png")}
            style={styles.loadingLogo}
            resizeMode="contain"
            accessibilityRole="image"
            accessibilityLabel="NuMee"
          />
          <ActivityIndicator
            style={styles.loadingSpinner}
            size="large"
            color="rgba(255,255,255,0.9)"
          />
        </View>
      ) : null}

      <StatusBar style={loading && !error ? "light" : "dark"} />
    </View>
  );
}

const topInset =
  Platform.OS === "android"
    ? RNStatusBar.currentHeight ?? 0
    : 52;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: topInset,
  },
  webview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: topInset,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BRAND_BLUE,
    paddingHorizontal: 32,
  },
  loadingLogo: {
    width: "78%",
    maxWidth: 320,
    height: 88,
  },
  loadingSpinner: {
    marginTop: 28,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#b91c1c",
    textAlign: "center",
  },
});
