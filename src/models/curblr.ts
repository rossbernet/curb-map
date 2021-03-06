import { GlobalState } from "../common/types";
import { DvaModelBuilder } from "dva-model-creator";
import { time, day, priority, activity } from "../actions/filter";

import geojsonData from '@/assets/data/philadelphia.curblr.json';
import curblrFeed from '@/assets/data/philadelphia_download.curblr.json'

import { CurbFeature, CurbFeatureCollection, filterTimeAndDay } from '@/common/curblr';
import { FeatureCollection, featureCollection, feature, LineString } from '@turf/helpers';


import {fromJS} from 'immutable';
import mapStyle from '../assets/style.json';

const curblrData = geojsonData as CurbFeatureCollection;
const downloadData = curblrFeed as CurbFeatureCollection;

const initState:GlobalState = {
    curblr: {
        time: "09:01",
        day: "mo",
        mode: "time",
        data: curblrData,
        downloadData: downloadData
    }
}

const builder = new DvaModelBuilder(initState, "curblr")
    .case(time, (state,payload) => {
        return {
            curblr:{ time:state.curblr.time,
            day: state.curblr.day,
            mode:state.curblr.mode,
            data: state.curblr.data
        }}
    });

export default builder.build();

export const actions = {
    time,
    day,
    priority
};
