import { ITokenResponse } from "@/models/auth.model";
import { IResponse } from "@/models/response.model";
import { setAccessToken } from "@/utils/auth/accessTokenHelper";
import { useAuth } from "@/utils/context/AuthContext";
import { useRootState } from "@/utils/context/RootStateContext";
import { setItem } from "@/utils/localStorage";
import { ToastState } from "@/utils/reducer/toastReducer";
import { Castoro, IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const inter = Inter({
  subsets: ["latin"],
});

const castoro = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const IBMPlexSans = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: "400",
});

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const { dispatch } = useRootState();
  const router = useRouter();
  const { login } = useAuth();

  const handleSignIn = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      }
    );

    let toastInfo: ToastState;
    const result: IResponse<ITokenResponse> = await response.json();
    if (result.statusCode === 200) {
      setItem("username", result.data.username);
      login(result.data.username);
      setAccessToken(result.data.accessToken);
      router.push("/blog");

      toastInfo = {
        showToast: true,
        variant: "success",
        message: `Sign in successful`,
      };
    } else {
      toastInfo = {
        showToast: true,
        variant: "danger",
        message: `Sign in unsuccessful`,
      };
    }

    dispatch({ type: "toast/set", payload: toastInfo });
  };

  return (
    <div className="col-12 bg-dark-green vh-100">
      <div className="row row-cols-2 vh-100">
        <div className="col-12 col-lg-6 order-2 order-lg-1 d-flex align-items-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-6 p-3">
            <h2 className={`text-white mb-5 ${inter.className}`}>Sign in</h2>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`col-12 shadow-none mb-3 ${inter.className}`}
            />
            <Button
              className={`col-12 btn-success fw-semibold text-white ${IBMPlexSans.className}`}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </div>
        </div>

        <div className="col-12 col-lg-6 order-1 order-lg-2 bg-green d-flex align-items-center justify-content-center logo-container">
          <div>
            <Image
              src="/images/board-logo.png"
              width={300}
              height={250}
              quality={100}
              alt="board-logo"
            />
            <h3 className={`${castoro.className} text-white text-center mt-4`}>
              a Board
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
