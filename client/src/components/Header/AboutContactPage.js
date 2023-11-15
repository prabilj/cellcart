import React from 'react';
import { Container, Tabs, Tab, Card, CardContent, Typography, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Header from './Header'

const AboutContactPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const aboutImageURL = 'https://c7.alamy.com/comp/2EA38D2/shopping-cart-wi…ow-background-online-shopping-concept-2EA38D2.jpg'; 
  const contactImageURL = 'https://as2.ftcdn.net/v2/jpg/06/26/17/69/1000_F_626176936_buQqfal5yQKdxCrGDmXBglegUpvP2tCM.jpg'; 

  return (
    <>
     <Header/>
    <Container>
     
      <Typography variant="h4" gutterBottom>
        About & Contact
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="About" />
        <Tab label="Contact" />
      </Tabs>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {selectedTab === 0 && (
              <>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Welcome to CellCart! We're passionate about providing you with the latest and greatest smartphones at competitive prices.
                    With a commitment to quality and customer satisfaction, our team at CellCart strives to make your online shopping experience for smartphones easy and enjoyable.
                    Whether you're a tech enthusiast, a casual user, or searching for the perfect gift, we're here to assist you on your smartphone journey.
                    Explore our extensive collection and discover the perfect device for your needs.
                    Thank you for choosing CellCart as your trusted source for top-notch smartphones.
                    {/* Add more content here */}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <img src={aboutImageURL} alt="About" style={{ width: '100%', height: 'auto' }} />
                </Grid>
              </>
            )}
            {selectedTab === 1 && (
              <>
                <Grid item xs={12} sm={6}>
                  <img src={contactImageURL} alt="Contact" style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <div className="Contact-content">
                      <h2>Our Contact Information</h2>
                      <ul>
                        <li className="contact-item">
                          <EmailIcon className="icon" /> <a href="mailto:contact@example.com">contact@example.com</a>
                        </li>
                        <li className="contact-item">
                          <PhoneIcon className="icon" /> +1 (123) 456-7890
                        </li>
                        <li className="contact-item">
                          <LocationOnIcon className="icon" /> 1234 Main Street, City, Country
                        </li>
                      </ul>
                    </div>
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
    </>
  );

};

export default AboutContactPage;
