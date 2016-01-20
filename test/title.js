var chai = require('chai'),
    $ = require("cheerio"),
    expect = chai.expect;

var title = require('../controllers/title');

describe('Title via callbacks', function(){
   it('should return a default result if no address passed',function(done){
       var req = {
           query:{
               address: undefined
           }
       };
       var res = {
           send: function(data){
               var ul = $("ul",data);
               expect(ul.children().length).to.eq(1);
               done();
           }
       }

       title.titleViaCallback(req,res);
   });
    it('should return a error result if invalid address passed',function(done){
        var req = {
            query:{
                address: "www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaCallback(req,res);
    });
    it('should return a result if correct address passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: "http://www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaCallback(req,res);
    });
    it('should return one result for each address if address array passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: ["http://www.google.com","http://www.yahoo.com"]
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(2);
                done();
            }
        }

        title.titleViaCallback(req,res);
    });
});

describe('Title via async', function(){
    it('should return a default result if no address passed',function(done){
        var req = {
            query:{
                address: undefined
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaAsync(req,res);
    });
    it('should return a error result if invalid address passed',function(done){
        var req = {
            query:{
                address: "www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaAsync(req,res);
    });
    it('should return a result if correct address passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: "http://www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaAsync(req,res);
    });
    it('should return one result for each address if address array passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: ["http://www.google.com","http://www.yahoo.com"]
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(2);
                done();
            }
        }

        title.titleViaAsync(req,res);
    });
});

describe('Title via promises', function(){
    it('should return a default result if no address passed',function(done){
        var req = {
            query:{
                address: undefined
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaPromises(req,res);
    });
    it('should return a error result if invalid address passed',function(done){
        var req = {
            query:{
                address: "www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaPromises(req,res);
    });
    it('should return a result if correct address passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: "http://www.google.com"
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(1);
                done();
            }
        }

        title.titleViaPromises(req,res);
    });
    it('should return one result for each address if address array passed',function(done){
        this.timeout(5000);
        var req = {
            query:{
                address: ["http://www.google.com","http://www.yahoo.com"]
            }
        };
        var res = {
            send: function(data){
                var ul = $("ul",data);
                expect(ul.children().length).to.eq(2);
                done();
            }
        }

        title.titleViaPromises(req,res);
    });
});