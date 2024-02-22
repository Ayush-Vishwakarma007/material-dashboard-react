/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { post } from "../../../services/api-service"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate } from 'react-router-dom';
import Base64 from '../../../services/base64';

function Basic() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [role, setRole] = useState("company");
  const navigate = useNavigate(); 

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const encryped_password = Base64.btoa(password);
      password = encryped_password
      const userData = { name, email, password,role };
      const response = await post("auth/signup", userData);
      if(response){
        toastr.success('SignUp Successful');
        navigate('/dashboard'); 
      }else{
        toastr.error("Something went wrong")
      }
    } catch (error) {
      toastr.error('Login Failed');
      console.error("Error signing up:", error.message);
    }
  };
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <RadioGroup
                aria-label="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="company"
                  control={<Radio />}
                  label="Company"
                />
                <FormControlLabel
                  value="volunteer"
                  control={<Radio />}
                  label="Volunteer"
                />
              </RadioGroup>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignUp}
              >
                Sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
