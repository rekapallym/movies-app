import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import dateFormat from 'dateformat';
import {getMovieDetail} from '../services/services';
import StarRating from 'react-native-star-rating';
import PlayButton from '../components/PlayButton';

const noImage = require('../assests/images/noImg.jpeg');

const dimensions = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovieDetail(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              movieDetail.poster_path
                ? {
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetail.poster_path,
                  }
                : noImage
            }
          />
          <View style={styles.scrollContainer}>
            <View style={styles.playButton}>
              <PlayButton />
            </View>
            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
            {movieDetail.genres && (
              <View style={styles.generesContainer}>
                {movieDetail.genres.map(genre => {
                  return (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <StarRating
              disabled={true}
              maxStars={5}
              rating={movieDetail.vote_average}
              fullStarColor={'gold'}
              starSize={30}
            />
            <Text style={styles.overview}>{movieDetail.overview}</Text>
            <Text style={styles.releaseDate}>
              {'Release Date: ' +
                dateFormat(movieDetail.release_date, 'mmmm dS yyyy')}
            </Text>
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  image: {height: dimensions.height / 2},
  scrollContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  generesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -29,
    right: 20,
  },
});

export default Detail;
