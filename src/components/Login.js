import styled from "styled-components";

const Login = props => {
    return (
        <Container>
            <Content>
                <CTA>
                    <CTALogoOne src="/images/cta-logo-one.svg" alt="logo"/>
                    <SignUp>GET IT ALL THERE</SignUp>
                    <Description>
                        Star on Disney+ brings you more. A brand-new world of TV series, movies and new originals, with thousands of hours of bigger, bolder and more exciting stories than ever before. Enjoy Star as part of your Disney+ subscription.
                    </Description>
                    <CTALogoTwo src="/images/cta-logo-two.png" alt="logo"/>
                </CTA>
                <BgImage/>
            </Content>
        </Container>
    );
}

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`
const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`

const BgImage = styled.div`
  position: absolute;
  z-index: -1;
  background-image: url('/images/login-background.jpg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
`
const CTA = styled.div`
  margin-bottom: 2vw;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  transition: opacity 0.2s ease-out;
`
const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`

const SignUp = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  border: 1px solid transparent;
  display: block;
  width: 100%;
  margin-bottom: 12px;
  letter-spacing: 1.5px;
  padding: 16.5px 0;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0483ee;
  }
`

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5em;
  letter-spacing: 1.5px;
`

const CTALogoTwo = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`

export default Login
