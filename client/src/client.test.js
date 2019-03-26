import React, { Component } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';

import Home from './components/home.js';

describe('testing client', () => {

  describe('Home Component', ()=>{
    describe('<input />', () => {
      it('should update state  when file is input', () => {
        const wrapper = shallow(< Home />);
        const input = wrapper.find('input');

        //creating sample File object
        let name = "foo.jpg"
        let mime = "image/jpeg"
        let fileObj =  new File(["foo"], name, {type : mime , lastModified : Date.now()});
        //simulating input tag
        input.simulate('change', {target : {files : [fileObj] } } );

        expect(wrapper.state().selected).toBe(fileObj);
        expect(wrapper.state().name).toBe(name);
      });
    });

    describe('<button />', () => {
      it("should call handleClick function when get clicked", () => {
        const wrapper = shallow(< Home />);
        const spy =jest.spyOn(Home.prototype, 'postData');
        wrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
      });

      it('should post request to server with image to be uploaded', () => {
        const wrapper = shallow(< Home />);
        let name = "foo.jpg"
        let fileObj =  new File(["foo"], name, {type : "image/jpeg", lastModified : Date.now()});
        //mockData
        let mockData = {
          success : true
        }

        const mock = new MockAdapter(axios);
        let fd = new FormData();
        const config = {
          headers : {
            'content-type' : 'multipart/form-data'
          }
        };
        fd.append('encryptedImg', fileObj);
        mock.onPost('http://localhost:3001/api/uploads').reply(200, mockData);
        wrapper.instance().postData(fd).
        then(function(res){
          expect(res.data).toBe(mockData);
          expect(res.status).toBe(200);
        }).
        catch((reason)=>{
          //handling promise rejection
        });
      });
    });
  })
});
