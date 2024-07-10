import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getCompanies } from '../apiService'; // Importez votre fonction pour récupérer les companies
import company1 from '../assets/company1.jpg'; // Importez vos images
import company2 from '../assets/company2.jpg';
import company3 from '../assets/company3.jpg';

const Dashboard = () => {
  const [numCompanies, setNumCompanies] = useState(0); // État pour stocker le nombre de companies

  useEffect(() => {
    fetchCompanyCount();
  }, []);

  const fetchCompanyCount = async () => {
    try {
      const response = await getCompanies(); // Appelez votre fonction pour récupérer les companies
      setNumCompanies(response.data.length); // Mettez à jour l'état avec le nombre de companies récupéré
    } catch (error) {
      console.error('Error fetching companies count:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard!</p>

      {/* Tableau de statistiques Bootstrap */}
      <Row>
        <Col md={4}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Companies</h5>
              <p className="card-text">{numCompanies}</p> {/* Affichez le nombre de companies ici */}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pages</h5>
              <p className="card-text">100 Million</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sessions</h5>
              <p className="card-text">10 Million</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Cercle Bootstrap */}
      <Row className="mt-4">
        {/* Ajoutez votre code pour le cercle Bootstrap ici */}
      </Row>

      {/* Cartes avec des images */}
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={company1} />
            <Card.Body>
              <Card.Title>Company 1</Card.Title>
              <Card.Text>
                Description de la Company 1.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={company2} />
            <Card.Body>
              <Card.Title>Company 2</Card.Title>
              <Card.Text>
                Description de la Company 2.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={company3} />
            <Card.Body>
              <Card.Title>Company 3</Card.Title>
              <Card.Text>
                Description de la Company 3.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Section Domains */}
      <section id="services" >
    <div class="services container">
    <div class="service-top">
      <h1 class="section-title">Doma<span>i</span>ns</h1>
      <p>azeer azer azer azer azer azer <u>azer</u> azer azer  , azer ,  azer and azer azer azer  !</p>
    </div>
    <div class="aze">
    <div class="service-bottom">
      <div class="service-item">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <h2 style={{ fontSize: '18px'}} >reseaux</h2>
        <p style={{ fontSize: '12px'}}>
  If you are a student concerned about networks, we can offer you an internship to enhance your skills and level up.
</p>

      </div>
      <div class="service-item2">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <h2 style={{ fontSize: '18px'}} >Telecommunication</h2>
        <p style={{ fontSize: '12px' }}>
  If you are concerned about Telecommunication, we can offer you an internship to enhance your skills.
</p>
      </div>
      <div class="service-item3">
        <div class="icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEW0lEQVR4nO2cy6tNURzH9/UqYUQyIJG66SYMlDK5yoCBIo/u9XaVGIj/gJIyNZRMmHBTykQGJpKIGBgwQpLkTfK+96OVhdNprf1w1lnrt+/+feoObmfvtb77fM7+rbX3OmdnWc0BNgPvgI/AptR5Gg/wgn88b/wbkhraSJ2n8aBCZIEKkQUqRBaoEFkw1oS0H5CSFhUiDBUiDBUijLE3KNYMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFSIMFRIQYA5wwX6v2PxdBHortqELVAFlvHEs+r01r1VoR4WEwJ4ZPoYrtKNCQmBLlI8PtRQSoganAJgPfM8R8r52QkLV4NgAa23GPM7XUUiQGhwLYDxwDBgtkPEamF1HIUFqcAyAmcBVT9Y7pkSZzObMqCJDjBBgEfCj4JO2KhMAsAJ45sj3FdgfoP20QoAdwCeKGQVOAJO6nSkn617gmyPbU2B5oD7SCAEmA6eozm1gQbdyebJOBc558pjSNTNgX/GF2BL1wHOAd239/QDc8mxjavRAN7I5svZ5so4Ah4FxgfuLKySnRH0BDjq2X+eZDhvOmE9v6IwtfW/xZDUzp9Vd6jOOkIIS9RBYXHCNci1n36Whctr+JgDHc2ZR80L2F10IsBC47znAs2U+5fye9x8BfnpmOAeBngBZZwM3PFlPdntS0XUhVUtUifb6PdNOwxVgVgdZV7Y9CeIPn4Gh/203mRDHvSgzQLswg+SiDkLPAC552jay+iu2N84O0COerH1ZJIIJybkX9V8lqkR/PcABe6a1Y8raUTMWlGhnOnDZk3UYmJZFJKSQvHtRf077PV04gCU5U+jrwNycfZcBTxz7mTu3h7IEhBSSdy/qRyclqghgCnDa07e5E7vBsc9+OxlwlbwVWSJiCSm9HtAJwIC9aHRxq2Vsuxfjqju1ELOY1PF6QKcA84CbVGPU3kofHytnDCG9noWaSusBIQAm2gs716ypHZN5bSaEYEJaZlrDLfeiKq8HhARYVSDDDN7zM0EEFSIRBIxtVWiCkIsSxrayNEFIr5SxrQxjXojEsS1rupA6oUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoUKEoULqJkRJiwoRhgoRhgoRRlZ3GGsHVHdQIbJAhcgBGHKU4Y2pczUSYLfn2+7m521bU+drFPhlqBSBMlrPlG3RAzYJystQKZEG8JG2N9wlZ8TxA9QoD65p+pkxCuxzCHFtq+UrhozMcx2SI2V7sGBNhAIZPiE5+6qUbsrIE1IgZUfrdkogGUVC7OsqJZYMA/C4ZbtHmYMcKTtd2yvFU9sh35sErLHPKzF/ayq2reUr1JkRsA/zv54psWWUkLLr70ZNJqaMlH3WgpRvDCrF+YzcSgN4xEnEYNYk7PMTX6eUUSDlVYhH0NZNyKvUMnKkvGyUEAOw3kp5KaFEAIMtedanCvILAJDgqSkTqg0AAAAASUVORK5CYII="/></div>
        <h2 style={{ fontSize: '18px'}}> cyberSecurity</h2>
        <p style={{ fontSize: '12px'}}>If you are concerned about cybersecurity, we can offer you an internship to enhance your skills and level up.</p>
      </div>
      <div class="service-item4">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <h2 style={{ fontSize: '18px'}}>development</h2>
        <p style={{ fontSize: '12px'}}>If you are concerned about development , we can offer you an internship to enhance your skills and level up.</p>
      </div>
      </div>
    </div>
  </div>
  </section>
  
  
<section id="about">
  <div class="about container">
    <div class="col-left">
      <div class="about-img">
        <img src={company1} alt="img"/>
      </div>
    </div>
    <div class="col-right">
      <h1 class="section-title">About <span>Us</span></h1>
      <h2>Job Hunting Website </h2>
      <p>As recruitment website , our main goal is to connect employers with potential candidates who  possess the necessary skills and qualifications for the job . We offer a variety of services to help employers and job seekers alike. For employers , we provide a platform to post job listings and search through resumes to find the perfect candidate!</p>
         <a target="_blank" href="assets/convention1.pdf" class="cta">Exemple de convention</a>
         <a target="_blank" href="assets/cvmail.pdf" class="cta">Exemple de CV </a>
    </div>
  </div>
 </section>


<section id="contact">
  <div class="contact container">
    <div><h1 class="section-title">Contact <span>info</span></h1></div>
    <div class="contact-items">
      <div class="contact-item">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <div class="contact-info">
          <h1>Phone</h1>
          <h2>+216 92 631 204</h2>
        </div>
      </div>
      <div class="contact-item">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <div class="contact-info">
          <h1>Email</h1>
          <h2>azerazerazer@gmail.com</h2>
        </div>
      </div>
      <div class="contact-item">
        <div class="icon"><img src="data:image/png;base64,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"/></div>
        <div class="contact-info">
          <h1>Adress</h1>
          <h2> Nabeul ,Tunisia</h2>
        </div>
      </div>
    </div>
  </div>
  </section>


<section id="footer">
  <div class="footer container">
    <div class="brand"><h1>azer <span>azer</span>ty<span>u</span>azer </h1></div>
    <h2>azer azer azer azer azer azer azer azer !</h2>
    <div class="social-icon">
      <div class="social-item">
        <a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFVUlEQVR4nO2dXYxfQxTAr7aU4GFDfZX4qDS0VcSjSESEICgtfVGCVEJMiK82Flk80NiXDSEiikSECoJG4iu7pV1tNNHWppLqrvp80G4REluqP5n0SDYbanfu3JkzM/eX3DTZ7G7Oub/t/945M3OmqlpaWlpaWlpaWgoEmAzMAq4ElgLPAWuATcAgsBPYJddO+dom+Z7l8jP2Z0+1vyt2PkkCnATcBKwAhvHHr8D7wBLgLGBS7FzVAhwvN2or4fgGeBSYGTt/FQD7A9cC/cRnDbAImFKVBnCAiNiCPr4CbgMOqnIH2A+4AfgB/XwHXGdjrnIEmAusJj0+Bk6rcgGYCnQDf5IufwDL7EdtlcGb0yfkw3pgRpUiwDwZqOXGL8DCKiWALvLn/iqRMseTlMMTakf78vB+lfJ4Rd3D3v6VSN2pVN5QVbgEemLfEQU8VWkAeDD2nVDEfbFlLIh9B5Sxx869xJIxA/g59h1QyE/AiTHeqOyoVSsjwLvycXo1cK7U0o4DOuRfOwl2ukxUnQdcBtwKPOKh+Lku6JuX1KY0sgG4ETikZn59HmJZ5u+O7zvYuQoLhTtkcsnLIM2TEFuQnOMjnv+bz9BWQv8UmO45Tx9CLKsanU+RySVN9AOHNpCnLyGWRb7j+yfIA4Hv0cPXwLSGcu3zvJDC/wMeuBld7/sXek+yGSGWxU2sDhlCD697TbB5IYNeV7PIChFNnOktuTBCLNf4DFDTNOx6b4mFFbLaV3Az0cWSmvlMA84Gzt/HtbGh5179+XjgYXRxhmMe02XeYnfE2Lt8DATtSj4t/OYyGgeOUfLKvrXWQFGKb5pY65jHSvQwu46Q29HFS461N02YOkLeRBfdGcxovlZnSY+dbNFEp0Mevehi2KkqLdvItHGXQx4aHuZjOcVFyBXowzjkEfM197+43EWI3SyZtBD2Vqg1co+LkOdJX8jB6ORZFyF2o4o2TCZCVrkIGUAfJhMhG12EbEMfJhMhQy5CfG7Y94XJRMh2FyG2VYU2TCZCRjQL6ZHVhB3juKY6VKs7HK6mKxS7XISE2h8YZoXfOAGOCJDzDpfAvqVMIecEyHmbS2BfUKaQxQFyHnAJzC6DLFFId4Cce10Cs82/ShSyMkDOz7gE1kmZQr4MkPNSl8AWUpgQ9raNCrHVYoFLcLZHYWlCZmueoLKDqh8LEzI/QL7bnZcCBVrkoEnIvaoXigN3BwjQSr9qnNfJE4x/ygR+t70+CJDvHSl8ppZUXJzlLESS2oweTOJCPq8lQ5J6CD2YxIU84EPIHPRgEhdS7+NqVGIfoQOTsJA+LzKUNZkxCQuZ51PIZCWbPk2iQoa8NzizNyN2VqQr5BavMkZtjQ5RCc1NyGBjnYECVoBzEjK/ERmjCo5rIyZnEhPS33gzfynL/x4pQZOQkJFgTfxts8dISZqEhEx8VtAVqaLGaPFnEhGyLvhJPcAJMtkSEpOAkOFoJyhIG4qQW8aMciH2XlzU3B0fX9L2ZLVQGOVCJrwptRGAxwIlbBQLebzSgoxPni5YyHJ1x1ZIAfLFAoW8oE7GmP8pXQUJ6VEr418qw39lLGS3bUtepQRwcQPjFKNAiO2ifUmVIsCRwHsZCekFjq1SRh72nZ4KkiaSkBHJQc+xRnWR4yHeSVDIh7bCXeWKLJjYnICQLbYjUlUCcqrbpcBnCoUMSOPoIs9VnyQn27w1ziKlaUiI3aTztsSS53Hdjn11O2WeZU8gIRukOHp0c5llAHCUnFWyYkwTnLpCbLu/l4HrbS/f5jLIHOAw4IKJzlHLnsE7Zd7m8OYibGlpaWlpaWlpqVTzN2F2x39rAiE5AAAAAElFTkSuQmCC"/></a>
      </div>
      <div class="social-item">
        <a href="#"><img src="data:image/png;base64,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"/></a>
      </div>
      <div class="social-item">
        <a href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADlElEQVR4nO2dzW8OURSHRxtCI2yKnUgsxI40kahiK7HwUelCV/0DrHzHRqTq+2MlsSdYsurCkrCx8Q9Quig7LNDQR673Nm2q9c593zM978z8nv3Mufc8mTt3Pu49WSaEEEKIcgF0A/uAW8Ar4BMwTfWZjn0Nfb4J7A25WM7ErwHOAZ+9M9FBBCFnQm6KTv4QMOnd2w7mA3CsiMSvAC4CM949LAEhR1eBLqvkdwFPvHtVQh6bSACuePekxIxajPmiveFosJ3ZTripiPYIk5aeVgScbzOwmONMKw9ZmufbMZX0sAbsNwwuGgykCLgdDxJ23EgR8NowsGjwMkWAxn97plIE/CygAXXnR4oAUQAS4IwEOCMBzkiAMxLgTCcIGAcOA5uAlcBmYAR4Sw3wFPAdGG7y8m+MiuMpYDhn3LtUGC8B44kfgSapKF4CDuUOnP2NPUpF8RKwMVHAQSqKl4BViQL6qSheAjYnChikongJGEkUcI+K4iXgbd4P0sBG4CsVxUtAYCxHzO74pFxZPAUQH7IW/X2bxquJSie/EwQQH7Iux6nmbuBoHPO/UQM6QUCtySTAFwmosYADCbH7jI//DTwDjgNbgNXAOmB7WE4EPAC+sAzUUcAbYGeOY3qBO0Wv8qybgPstvIfaE/9kLoSUhpRZwDbgSO7O/nv81qJ+zUxpRGkFWBAXX5sPRykNqLWAoj6PZnmxDlxSAb3WLwZTglN3AQHgoWUSsrxgT1kFDFkmISWwNWUVsN0yCSmBrSmrgPWWSUgJXHoBNDYYCas9T4RfY4C1qeeI5zHDJaiHAGAD8HzBOd4Bu1LOY50Ll6BOAp4u0Y73qVeCZRJcgjq8iugBfhn+qWeGS1AHATuatOVs7kRIgJnA+VyQgPQEHpCA8n4RW4iuAAloAvboCqA+s6C+Jm3RECQBTdAVUEwusrxIwBwS0ED3gDbRTRgNQbNoFvQ/0DRUN+H5YEjmETSiewASUOt7gEAC3Em5ArRxq/PGrdq62Hnr4lCkTNjyIkVAqBAnbLmWukJE2NKfIqA7lucTNkwl1xSLtRGFDSeTkh8FhAXNE0YNqDMfWy7yGVeSq35k68y0s2R2VkLYXka0xqW2kj+vmGcoTCnSeGRZUVXlbL3K2S6ypaTqSy7NRNtjfs7Z0ekiN7UoISEXp0JuCk3+IveGgVAhLhQpi42ow1vUn7Gvoc/X4w4r9sONEEIIIbJC+QNgX1U61BWSoAAAAABJRU5ErkJggg=="/></a>
      </div>
    </div>
    <p>Copyright © 2023 azer azer . All rights reserved </p>
  </div>
</section>
    </Container>
  );
}

export default Dashboard;
