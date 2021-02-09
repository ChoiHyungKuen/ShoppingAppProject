module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        // id: {}, 기본적으로 들어있다.
        name: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false, // 필수
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false, // 필수
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
        mainImageSrc: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'  //한글지정
    });
    //관계를 테이블로 정의해서 자신에서의 관계를 구별해줄 수 있는거같음  (다대다 관계로만 되나봄)
    Product.associate = (db) => {
        db.Product.belongsToMany(db.Cart, { through: 'ProductCart', foreignKey: 'productId' });  // 팔로워를 찾으려면 내가 팔로우중인 사람을 갖고 검색하고
        db.Product.hasMany(db.ProductImage);
        // db.User.hasMany(db.Post);
        // db.User.hasMany(db.Comment);
        // db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        // 아래 두 경우 반대의경우? 좀 헷갈리니 나중에 한번더 보고 정리해주는게 좋을듯
        // userId 가 각각 두개로 동일하니 구별이 필요하고 그 역할을 foreignKey 로 구별해주게 해준다.
        // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });  // 팔로워를 찾으려면 내가 팔로우중인 사람을 갖고 검색하고
        // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }); // 팔로우 중인 사람을 찾으려면 팔로워를 먼저 찾고 거기에 연결된 사람을 검색해야함 - 그걸 foreignKey 로 구분함
        
    };

    return Product;
}