import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { 
  Button, Grid,
  Segment, Header,
  Container, Divider,
  Rating, Dimmer, Loader 
} from 'semantic-ui-react'
  

import { getSingleLocation } from '../../lib/api'
import CarouselSlide from './CarouselSlide'
import LocationComments from './LocationComments'
import LocalPublic from '../locals/LocalPublic'

class LocationShow extends React.Component {

  state = {
    locationData: null
  }

  async componentDidMount() {
    const locationId = this.props.match.params.id

    const res = await getSingleLocation(locationId)

    this.setState({
      locationData: res.data
    })
  }


  render() {

    if (!this.state.locationData) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )
    }


    const { placePhotos, placeName,
      placeDescription, amenities,
      local, comments
    } = this.state.locationData
    const { avgRating } = this.state.locationData
    const features = this.state.locationData.feature
    const locationId = this.props.match.params.id

    return (
      <>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header style={{ fontSize: '2.5em' }}>
                  <p>{placeName}</p>
                </Header>
                <p style={{ fontSize: '1.20em' }}>{placeDescription}</p>
                <p style={{ fontSize: '1.33em' }}>
                  Has:<br></br>
                  {
                    features.map((element, index) => {
                      return <span key={index}>{element}</span>
                    })
                  }
                </p>

                <p style={{ fontSize: '1.33em' }}>Amenities:
                  <br></br>
                  {
                    amenities.map((amenity, index) => {
                      return <span key={index}>{amenity}<br></br></span>
                    })
                  }
                </p>

              </Grid.Column>
              <Grid.Column floated='right' width={8}>
                <Carousel className='our-carousel-control' showThumbs={false}>
                  {placePhotos.map((photo, index) => {
                    return <CarouselSlide key={index} photo={photo} />
                  })}
                </Carousel>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>

              <Button
                fluid
                animated='fade'
                as={Link}
                to='/features'
              >
                <Button.Content visible>Discover More Locations</Button.Content>
                <Button.Content hidden>Back to Features</Button.Content>
              </Button>
            </Grid.Row>
          </Grid>

          <Segment vertical>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '1em 0em', textTransform: 'uppercase' }}
            >
              Contributed By
            </Divider>
            <Container text>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <LocalPublic {...local} />
              </Grid.Column>
            </Container>

            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '1em 0em', textTransform: 'uppercase' }}
            >
              Reviews
            </Divider>


            <Container text>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header>Community Rating:</Header>
                <Rating icon='heart'
                  size='large'
                  defaultRating={avgRating}
                  maxRating={5}
                  disabled
                />
                <LocationComments 
                  locationId={locationId}
                  comments={comments}
                  {...local}
                />
              </Grid.Column>
            </Container>
          </Segment>
        </Segment>

      </>
    )
  }

}

export default LocationShow