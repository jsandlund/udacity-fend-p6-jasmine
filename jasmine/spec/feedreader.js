/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {

        /* Ensure that allFeeds variable has been defined and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs that are defined', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             var trimUrl = allFeeds[i].url.trim();
             expect(trimUrl).toBeTruthy();
           }
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have objects with "name" properties defined', function() {

             allFeeds.forEach(function(value, i){
               var name = value.name;
               expect(name).toBeTruthy();
             })

         })
    });

    describe('The menu', function(){

      /* This test ensures that the menu element is
       * hidden by default on page load.
       */
       it('should be hidden by default', function() {
         expect($("body")).toHaveClass("menu-hidden")
       })


       /* This test ensures that the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        it('should toggle visibilty when menu icon is clicked', function(){

          $('.menu-icon-link').click();
          expect($("body")).not.toHaveClass("menu-hidden");

          $('.menu-icon-link').click();
          expect($("body")).toHaveClass("menu-hidden");

        })

    })

    describe('Initial Entries', function(){

      /* This test ensures that when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it('should load at least one entry', function(done) {
         var numEntries = $(".feed .entry").length;
         expect(numEntries).toBeGreaterThan(0);
         done();
       });

    })

    describe('New Feed Selection', function() {

      /* This test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */

      var feed0;

      beforeEach(function(done) {
       loadFeed(0, function() {
          feed0 = $('.feed').html();
          done();
        });
      });

      it('content changes when a new feed is loaded', function(done) {

        loadFeed(1, function() {
          expect($('.feed').html()).not.toEqual(feed0);
          done();
        });

      });

    });

}());
