import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentary,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState(false);
  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentary(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryData,
        ]) => {
          const newImagesArr = [];
          const path = 'https://image.tmdb.org/t/p/w500';
          upcomingMoviesData.forEach(movie => {
            newImagesArr.push(path + movie.poster_path);
          });
          setMovieImages(newImagesArr);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentaryData);
        },
      )
      .catch(err => {
        setErr(err);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  return (
    <React.Fragment>
      {loading && !err && (
        <ScrollView>
          {movieImages && (
            <View styles={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}
          {popularMovies && (
            <View styles={styles.carosol}>
              <List
                title="Popular Movies"
                content={popularMovies}
                navigation={navigation}
              />
            </View>
          )}
          {popularTv && (
            <View styles={styles.carosol}>
              <List
                title="Popular TV Shows"
                content={popularTv}
                navigation={navigation}
              />
            </View>
          )}
          {familyMovies && (
            <View styles={styles.carosol}>
              <List
                title="Popular Family Movies"
                content={familyMovies}
                navigation={navigation}
              />
            </View>
          )}
          {documentaries && (
            <View styles={styles.carosol}>
              <List
                title="Documentaries"
                content={documentaries}
                navigation={navigation}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loading && <ActivityIndicator />}
      {err && (
        <Error errText1="something went wrong" errText2="Please refresh" />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  carosol: {justifyContent: 'center', alignItems: 'center', flex: 1},
  sliderStyle: {height: 0},
});

export default Home;
