import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Links } from "../imports/collections/links";
import ConnectRoute from "connect-route";

Meteor.startup(() => {
    Meteor.publish("links", function () {
        return Links.find({});
    });
});

function onRoute(req, res, next) {

    const { token } = req.params;
    const link = Links.findOne({ token });
    if (link) {
        Links.update(link, { $inc: { count: 1 } });
        res.writeHead(307, { "Location": link.url });
        res.end();
    } else {
        next();
    } 
}

const middleware = ConnectRoute(function(router){
    router.get("/:token", onRoute);
});

WebApp.connectHandlers.use(middleware);
