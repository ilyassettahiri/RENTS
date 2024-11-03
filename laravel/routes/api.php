<?php

use App\Http\Controllers\Api\V2\Auth\LoginController;
use App\Http\Controllers\Api\V2\Auth\LogoutController;
use App\Http\Controllers\Api\V2\Auth\RegisterController;
use App\Http\Controllers\Api\V2\MeController;
use App\Http\Controllers\Api\V2\UserController;


use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use LaravelJsonApi\Laravel\Routing\ResourceRegistrar;
use App\Http\Controllers\Api\V2\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\V2\Auth\ResetPasswordController;
use App\Http\Controllers\UploadController;







// Admin

use App\Http\Controllers\Api\V2\Admin\AccountC\AccountController;
use App\Http\Controllers\Api\V2\Admin\AccountC\DetailAccountController;
use App\Http\Controllers\Api\V2\Admin\AnalyticsC\DetailAnalyticsController;
use App\Http\Controllers\Api\V2\Admin\AnalyticsC\AnalyticsController;
use App\Http\Controllers\Api\V2\Admin\BoostedC\DetailBoostedController;
use App\Http\Controllers\Api\V2\Admin\BoostedC\BoostedController;
use App\Http\Controllers\Api\V2\Admin\CheckingOutC\DetailCheckingOutController;
use App\Http\Controllers\Api\V2\Admin\CheckingOutC\CheckingOutController;
use App\Http\Controllers\Api\V2\Admin\CollectionC\DetailCollectionController;
use App\Http\Controllers\Api\V2\Admin\CollectionC\CollectionController;
use App\Http\Controllers\Api\V2\Admin\CompletedC\DetailCompletedController;
use App\Http\Controllers\Api\V2\Admin\CompletedC\CompletedController;
use App\Http\Controllers\Api\V2\Admin\CurrentlyHostingC\DetailCurrentlyHostingController;
use App\Http\Controllers\Api\V2\Admin\CurrentlyHostingC\CurrentlyHostingController;
use App\Http\Controllers\Api\V2\Admin\CustomerC\CustomerController;
use App\Http\Controllers\Api\V2\Admin\CustomerC\DetailCustomerController;
use App\Http\Controllers\Api\V2\Admin\DashboardC\DashboardController;
use App\Http\Controllers\Api\V2\Admin\DashboardC\DetailDashboardController;
use App\Http\Controllers\Api\V2\Admin\DiscountC\DetailDiscountController;
use App\Http\Controllers\Api\V2\Admin\DiscountC\DiscountController;
use App\Http\Controllers\Api\V2\Admin\DraftC\DetailDraftController;
use App\Http\Controllers\Api\V2\Admin\DraftC\DraftController;
use App\Http\Controllers\Api\V2\Admin\FinanceC\DetailFinanceController;
use App\Http\Controllers\Api\V2\Admin\FinanceC\FinanceController;
use App\Http\Controllers\Api\V2\Admin\HelpC\DetailHelpController;
use App\Http\Controllers\Api\V2\Admin\HelpC\HelpController;
use App\Http\Controllers\Api\V2\Admin\InvoiceC\DetailInvoiceController;
use App\Http\Controllers\Api\V2\Admin\InvoiceC\InvoiceController;
use App\Http\Controllers\Api\V2\Admin\ListingC\DetailListingController;
use App\Http\Controllers\Api\V2\Admin\ListingC\EditListingController;
use App\Http\Controllers\Api\V2\Admin\ListingC\ListingController;
use App\Http\Controllers\Api\V2\Admin\MessageC\DetailMessageController;
use App\Http\Controllers\Api\V2\Admin\MessageC\MessageController;
use App\Http\Controllers\Api\V2\Admin\OnlinestoreC\DetailOnlinestoreController;
use App\Http\Controllers\Api\V2\Admin\OnlinestoreC\OnlinestoreController;
use App\Http\Controllers\Api\V2\Admin\PaymentC\DetailPaymentController;
use App\Http\Controllers\Api\V2\Admin\PaymentC\PaymentController;
use App\Http\Controllers\Api\V2\Admin\PlanC\DetailPlanController;
use App\Http\Controllers\Api\V2\Admin\PlanC\PlanController;
use App\Http\Controllers\Api\V2\Admin\ReservationC\DetailReservationController;
use App\Http\Controllers\Api\V2\Admin\ReservationC\ReservationController;
use App\Http\Controllers\Api\V2\Admin\ReviewC\DetailReviewController;
use App\Http\Controllers\Api\V2\Admin\ReviewC\ReviewController;
use App\Http\Controllers\Api\V2\Admin\SecurityC\DetailSecurityController;
use App\Http\Controllers\Api\V2\Admin\SecurityC\SecurityController;
use App\Http\Controllers\Api\V2\Admin\TeamC\DetailTeamController;
use App\Http\Controllers\Api\V2\Admin\TeamC\TeamController;
use App\Http\Controllers\Api\V2\Admin\TrackingC\DetailTrackingController;
use App\Http\Controllers\Api\V2\Admin\TrackingC\TrackingController;
use App\Http\Controllers\Api\V2\Admin\UpcomingC\DetailUpcomingController;
use App\Http\Controllers\Api\V2\Admin\UpcomingC\UpcomingController;




// Front

use App\Http\Controllers\Api\V2\Front\AboutC\AboutController;
use App\Http\Controllers\Api\V2\Front\AboutC\DetailAboutController;
use App\Http\Controllers\Api\V2\Front\AccountFrontC\AccountFrontController;
use App\Http\Controllers\Api\V2\Front\AccountFrontC\DetailAccountFrontController;
use App\Http\Controllers\Api\V2\Front\ArticleC\ArticleController;
use App\Http\Controllers\Api\V2\Front\ArticleC\DetailArticleController;
use App\Http\Controllers\Api\V2\Front\BlogC\BlogController;
use App\Http\Controllers\Api\V2\Front\BlogC\DetailBlogController;
use App\Http\Controllers\Api\V2\Front\BusinessC\BusinessController;
use App\Http\Controllers\Api\V2\Front\BusinessC\DetailBusinessController;
use App\Http\Controllers\Api\V2\Front\BusinessC\SearchBusinessController;
use App\Http\Controllers\Api\V2\Front\CancelledC\CancelledController;
use App\Http\Controllers\Api\V2\Front\CancelledC\DetailCancelledController;
use App\Http\Controllers\Api\V2\Front\CheckoutC\CheckoutController;
use App\Http\Controllers\Api\V2\Front\CheckoutC\DetailCheckoutController;
use App\Http\Controllers\Api\V2\Front\CompletedFrontC\CompletedFrontController;
use App\Http\Controllers\Api\V2\Front\CompletedFrontC\DetailCompletedFrontController;
use App\Http\Controllers\Api\V2\Front\ContactC\ContactController;
use App\Http\Controllers\Api\V2\Front\ContactC\DetailContactController;
use App\Http\Controllers\Api\V2\Front\CurrentlyHostingFrontC\CurrentlyHostingFrontController;
use App\Http\Controllers\Api\V2\Front\CurrentlyHostingFrontC\DetailCurrentlyHostingFrontController;
use App\Http\Controllers\Api\V2\Front\DashboardFrontC\DashboardFrontController;
use App\Http\Controllers\Api\V2\Front\DashboardFrontC\DetailDashboardFrontController;
use App\Http\Controllers\Api\V2\Front\FaqC\DetailFaqController;
use App\Http\Controllers\Api\V2\Front\FaqC\FaqController;
use App\Http\Controllers\Api\V2\Front\FavoriteC\DetailFavoriteController;
use App\Http\Controllers\Api\V2\Front\FavoriteC\FavoriteController;
use App\Http\Controllers\Api\V2\Front\HomeC\DetailHomeController;
use App\Http\Controllers\Api\V2\Front\HomeC\HomeController;
use App\Http\Controllers\Api\V2\Front\HomeC\SearchController;
use App\Http\Controllers\Api\V2\Front\InvoiceFrontC\DetailInvoiceFrontController;
use App\Http\Controllers\Api\V2\Front\InvoiceFrontC\InvoiceFrontController;
use App\Http\Controllers\Api\V2\Front\ListingFrontC\DetailListingFrontController;
use App\Http\Controllers\Api\V2\Front\ListingFrontC\ListingFrontController;
use App\Http\Controllers\Api\V2\Front\MessageFrontC\DetailMessageFrontController;
use App\Http\Controllers\Api\V2\Front\MessageFrontC\MessageFrontController;
use App\Http\Controllers\Api\V2\Front\PaymentFrontC\DetailPaymentFrontController;
use App\Http\Controllers\Api\V2\Front\PaymentFrontC\PaymentFrontController;
use App\Http\Controllers\Api\V2\Front\ReservationFrontC\DetailReservationFrontController;
use App\Http\Controllers\Api\V2\Front\ReservationFrontC\ReservationFrontController;
use App\Http\Controllers\Api\V2\Front\ReviewFrontC\DetailReviewFrontController;
use App\Http\Controllers\Api\V2\Front\ReviewFrontC\ReviewFrontController;
use App\Http\Controllers\Api\V2\Front\ServiceC\DetailServiceController;
use App\Http\Controllers\Api\V2\Front\ServiceC\SearchServiceController;
use App\Http\Controllers\Api\V2\Front\ServiceC\ServiceController;
use App\Http\Controllers\Api\V2\Front\ServicePageC\DetailServicePageController;
use App\Http\Controllers\Api\V2\Front\ServicePageC\ServicePageController;

use App\Http\Controllers\Api\V2\Front\JobC\DetailJobController;
use App\Http\Controllers\Api\V2\Front\JobC\SearchJobController;
use App\Http\Controllers\Api\V2\Front\JobC\JobController;
use App\Http\Controllers\Api\V2\Front\JobPageC\DetailJobPageController;
use App\Http\Controllers\Api\V2\Front\JobPageC\JobPageController;


use App\Http\Controllers\Api\V2\Front\StoreC\DetailStoreController;
use App\Http\Controllers\Api\V2\Front\StoreC\StoreController;
use App\Http\Controllers\Api\V2\Front\TermConditionC\DetailTermConditionController;
use App\Http\Controllers\Api\V2\Front\TermConditionC\TermConditionController;
use App\Http\Controllers\Api\V2\Front\ThankYouC\DetailThankYouController;
use App\Http\Controllers\Api\V2\Front\ThankYouC\ThankYouController;
use App\Http\Controllers\Api\V2\Front\UpcomingFrontC\DetailUpcomingFrontController;
use App\Http\Controllers\Api\V2\Front\UpcomingFrontC\UpcomingFrontController;
use App\Http\Controllers\Api\V2\Front\PricingC\DetailPricingController;
use App\Http\Controllers\Api\V2\Front\PricingC\PricingController;





Route::prefix('v2')->middleware('json.api')->group(function () {
    Route::post('/login', LoginController::class)->name('login');
    Route::post('/register', RegisterController::class);
    Route::post('/logout', LogoutController::class)->middleware('auth:api');
    Route::post('/password-forgot', ForgotPasswordController::class);
    Route::post('/password-reset', ResetPasswordController::class)->name('password.reset');


});

JsonApiRoute::server('v2')->prefix('v2')->resources(function (ResourceRegistrar $server) {
    $server->resource('categories', JsonApiController::class);



    $server->resource('items', JsonApiController::class);
    $server->resource('permissions', JsonApiController::class)->only('index');
    $server->resource('roles', JsonApiController::class);
    $server->resource('tags', JsonApiController::class);

    $server->resource('users', UserController::class);





    // Admin

    $server->resource('listings', ListingController::class);

    $server->resource('discounts', DiscountController::class);




    $server->resource('collections', CollectionController::class);

    $server->resource('onlinestores', OnlinestoreController::class);


    $server->resource('reservations', ReservationController::class);

    $server->resource('upcomings', UpcomingController::class);

    $server->resource('checkingouts', CheckingOutController::class);

    $server->resource('currentlyhostings', CurrentlyHostingController::class);

    $server->resource('customers', CustomerController::class);

    $server->resource('reviews', ReviewController::class);

    $server->resource('accounts', AccountController::class);

    $server->resource('analytics', AnalyticsController::class);

    $server->resource('boosteds', BoostedController::class);


    $server->resource('completeds', CompletedController::class);

    $server->resource('dashboards', DashboardController::class);

    $server->resource('drafts', DraftController::class);

    $server->resource('finances', FinanceController::class);

    $server->resource('helps', HelpController::class);

    $server->resource('invoices', InvoiceController::class);


    $server->resource('payments', PaymentController::class);

    $server->resource('plans', PlanController::class);


    $server->resource('securities', SecurityController::class);

    $server->resource('teams', TeamController::class);

    $server->resource('trackings', TrackingController::class);







    // Front

    $server->resource('abouts', AboutController::class);

    $server->resource('accountfronts', AccountFrontController::class);

    $server->resource('articles', ArticleController::class);

    $server->resource('blogs', BlogController::class);




    $server->resource('businesslists', BusinessController::class);

    $server->resource('cancelleds', CancelledController::class);

    $server->resource('checkouts', CheckoutController::class);

    $server->resource('completedfronts', CompletedFrontController::class);

    $server->resource('contacts', ContactController::class);

    $server->resource('currentlyhostingfronts', CurrentlyHostingFrontController::class);

    $server->resource('dashboardfronts', DashboardFrontController::class);

    $server->resource('faqs', FaqController::class);

    $server->resource('favorites', FavoriteController::class);

    $server->resource('homes', HomeController::class);

    $server->resource('invoicefronts', InvoiceFrontController::class);

    $server->resource('listingfronts', ListingFrontController::class);

    $server->resource('messagefronts', MessageFrontController::class);

    $server->resource('paymentfronts', PaymentFrontController::class);

    $server->resource('reservationfronts', ReservationFront::class);

    $server->resource('reviewfronts', ReviewFrontController::class);

    $server->resource('services', ServiceController::class);

    $server->resource('jobs', JobController::class);


    $server->resource('servicepages', ServicePageController::class);

    $server->resource('stores', StoreController::class);

    $server->resource('termconditions', TermConditionController::class);

    $server->resource('thankyous', ThankYouController::class);

    $server->resource('upcomingfronts', UpcomingFrontController::class);

    $server->resource('pricings', PricingController::class);












    Route::patch('reservations/{id}/status', [ReservationController::class, 'updateStatus']);

    Route::patch('collections/{id}/status', [CollectionController::class, 'updateStatus']);

    Route::patch('listings/{id}/status', [DetailListingController::class, 'updateStatus']);


    Route::delete('deletelistings/{id}', [ListingController::class, 'deleteListing']);
    Route::delete('deletecollections/{id}', [CollectionController::class, 'deleteCollection']);
    Route::delete('deletestores/{id}', [OnlinestoreController::class, 'deleteStore']);


    Route::patch('discounts/{id}/status', [DiscountController::class, 'updateStatus']);

    Route::patch('customers/{id}/status', [CustomerController::class, 'updateStatus']);

    Route::patch('reviews/{id}/status', [ReviewController::class, 'updateStatus']);

    Route::patch('stores/{id}/status', [OnlinestoreController::class, 'updateStatus']);




    // Admin

    Route::get('me', [MeController::class, 'readProfile']);
    Route::patch('me', [MeController::class, 'updateProfile']);

    Route::post('/uploads', [UploadController::class, 'upload']);

    Route::post('/uploads/collections', [UploadController::class, 'uploadcollection']);

    Route::post('/uploads/listings', [UploadController::class, 'uploadlisting']);

    Route::post('/uploads/store', [UploadController::class, 'uploadstore']);





    Route::get('listings/edit-listing/{id}', [EditListingController::class, 'getListing']);

    //Route::patch('listings/edit-listing/{id}', [EditListingController::class, 'updateListing']);

    Route::get('listings/detail-listing/{id}', [DetailListingController::class, 'showDetailListing']);



    Route::get('discount/discount-data', [DiscountController::class, 'getDiscountData']);




    // Front



    // Home
    Route::get('home', [HomeController::class, 'index']);

    Route::get('search', [SearchController::class, 'getSearchListings']);


    Route::get('service/search', [SearchServiceController::class, 'getSearchServiceListings']);

    Route::get('job/search', [SearchJobController::class, 'getSearchJobListings']);


    Route::get('business/search', [SearchBusinessController::class, 'getSearchBusinessListings']);


    Route::get('service', [ServiceController::class, 'index']);

    Route::get('job', [JobController::class, 'index']);


    Route::get('business', [BusinessController::class, 'index']);



    // home search

    Route::get('search/{city}', [SearchController::class, 'getSearchCity']);
    Route::get('search/{city}/{category}', [SearchController::class, 'getSearchCategory']);
    Route::get('search/{city}/{category}/{type}', [SearchController::class, 'getSearchType']);


    Route::get('searchjob/{city}', [SearchJobController::class, 'getSearchJobCity']);
    Route::get('searchjob/{city}/{type}', [SearchJobController::class, 'getSearchJobType']);



    Route::get('searchservice/{city}', [SearchServiceController::class, 'getSearchServiceCity']);
    Route::get('searchservice/{city}/{type}', [SearchServiceController::class, 'getSearchServiceType']);



    // Listing Front
    Route::get('listings/{category}/{url}', [ListingFrontController::class, 'getListing']);

    Route::get('listingpic/{category}/{url}', [DetailListingFrontController::class, 'getListingpic']);

    Route::post('listings/{category}/{url}', [DetailListingFrontController::class, 'createReview']);
    Route::post('listings/{category}/{url}/reviews/{reviewId}/like', [DetailListingFrontController::class, 'addToHelpful']);

    Route::post('listings/{category}/{url}/reviews/{reviewId}/reply', [DetailListingFrontController::class, 'createReviewReply']);

    // Favorite
    Route::post('listings/{category}/{url}/{id}', [FavoriteController::class, 'createFavorite']);

    Route::post('stores/{url}/{id}', [FavoriteController::class, 'createFavoriteStore']);


    Route::get('/favorites', [FavoriteController::class, 'getFavorites']);

    Route::get('/favoritestores', [FavoriteController::class, 'getFavoritestore']);





    // Messages

    Route::get('chat/conversations', [MessageFrontController::class, 'getConversations']);
    Route::get('chat/check', [MessageFrontController::class, 'checkConversation']);
    Route::get('chat/conversation', [MessageFrontController::class, 'getConversation']);
    Route::get('chat/clickconversation', [MessageFrontController::class, 'clickConversation']);

    Route::post('chat/sendmessage', [MessageFrontController::class, 'sendMessage']);
    Route::post('chat/createconversation', [MessageFrontController::class, 'createConversation']);










    // Store Front
    Route::get('stores/{url}', [StoreController::class, 'getStore']);


        // Article Front
    Route::get('article/{url}', [ArticleController::class, 'getArticle']);


    // Service page
    Route::get('services/{url}', [ServicepageController::class, 'getService']);

    Route::get('servicepic/{url}', [ServicepageController::class, 'getServicepic']);

    // Job page
    Route::get('jobs/{url}', [JobpageController::class, 'getJob']);

    Route::get('jobpic/{url}', [JobpageController::class, 'getJobpic']);


    // Reservation Front
    Route::get('checkout/{category}/{url}', [ReservationFrontController::class, 'getReservation']);
    Route::post('checkout/{category}/{url}', [ReservationFrontController::class, 'createReservation']);
    Route::post('checkout/discount', [ReservationFrontController::class, 'checkDiscount']);


    // Thank You
    Route::get('thank-you/{checkout_id}', [ThankYouController::class, 'getThankYou']);




    // Blog Front
    Route::post('blogs/category', [DetailBlogController::class, 'createBlogCategory']);
    Route::post('blogs/tag', [DetailBlogController::class, 'createBlogTag']);
    Route::post('blogs/author', [DetailBlogController::class, 'createBlogAuthor']);
    Route::post('blogs/policypage', [DetailBlogController::class, 'createPolicyPage']);
    Route::post('blogs/generaleinfo', [DetailBlogController::class, 'createGeneraleInfo']);

    Route::post('blogs/about', [DetailBlogController::class, 'createAbout']);


    Route::get('blogsdata', [DetailBlogController::class, 'index']);



});
