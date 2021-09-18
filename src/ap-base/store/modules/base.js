import headImg from '../../static/image/head/head1.jpg';
import logoImg from '../../static/image/logo.png';

export const baseStates = {
  min_height: null,
  fullLoading: false,
  is_collapsed: false,
  base_height_difference: 65,
  logo_src: logoImg,
  default_head_img: headImg
};

export const baseMutation = {
  SET_MIN_HEIGHT(state, minHeight) {
    state.min_height = minHeight;
  },
  SET_FULL_LOADING(state, flag) {
    // if(flag){
    //   Pace.start();
    // }else{
    //   Pace.stop();
    // }
    state.fullLoading = flag;
  }
};
