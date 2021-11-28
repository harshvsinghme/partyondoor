import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import {
  login,
  clearErrors,
  clearMessages,
} from "../../redux/actions/partnerActions";
import MetaData from "../../utils/MetaData";
import Loading from "../../components/design/Loading";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../utils/SendNotif";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, partner, message, error } = useSelector(
    (state) => state.partner
  );
  useEffect(() => {
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (partner) {
      if (message) {
        dispatch(SendNotif("success", message));
        dispatch(clearMessages());
      }
      router.push("/p/dashboard");
    }
  }, [dispatch, error, message, partner, router]);
  const [values, setValues] = useState({
    ID: "",
    password: "",
  });
  const { ID, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!ID)
      return dispatch(SendNotif("error", "Email or Phone can't be empty."));
    if (!password)
      return dispatch(SendNotif("error", "Password can't be empty."));
    dispatch(login(ID, password));
  };
  return (
    <Fragment>
      <MetaData title="Login | www.partyondoor.com" />
      <Loading show={loading} />
      <div style={{ height: "6vh" }}></div>
      <Typography
        variant="h6"
        display="block"
        sx={{ textAlign: "center", marginBottom: "32px" }}
        gutterBottom
      >
        Login
      </Typography>
      <div className="pLogiNmainDiv">
        <Stack>
          <FormControl className="pLogiNformControl">
            <Input
              type="text"
              placeholder="Email or Phone"
              className="pLogiNinput"
              name="ID"
              value={ID}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl className="pLogiNformControl">
            <Input
              type="password"
              placeholder="Password"
              className="pLogiNinput"
              sx={{ marginBottom: "9px" }}
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <VpnKeyIcon color="secondary" />
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            sx={{ textAlign: "center", marginBottom: "41px" }}
            gutterBottom
          >
            Your information is always safe with us :)
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            endIcon={<LoginIcon />}
            sx={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Link href="/p/signup">
            <a
              className="pLogiNLink mt-2 textCenter fontwb"
              style={{ color: "tomato" }}
            >
              New User? Signup
            </a>
          </Link>
        </Stack>
      </div>
      <div style={{ height: "150px" }}></div>
    </Fragment>
  );
};

export default Login;
