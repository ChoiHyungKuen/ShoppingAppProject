module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        // id: {}, 기본적으로 들어있다.
        src: {
            type: DataTypes.STRING(200), 
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'  //한글지정
    });
    //관계를 테이블로 정의해서 자신에서의 관계를 구별해줄 수 있는거같음  (다대다 관계로만 되나봄)
    ProductImage.associate = (db) => {
        db.ProductImage.belongsTo(db.Product);    // 게시글 - 이미지 관계는 1 대 다의 관계 .. 이미지는 하나의 게시글에만 속할 수 있다.
        // db.User.hasMany(db.Post);
        // db.User.hasMany(db.Comment);
        // db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        // 아래 두 경우 반대의경우? 좀 헷갈리니 나중에 한번더 보고 정리해주는게 좋을듯
        // userId 가 각각 두개로 동일하니 구별이 필요하고 그 역할을 foreignKey 로 구별해주게 해준다.
        // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });  // 팔로워를 찾으려면 내가 팔로우중인 사람을 갖고 검색하고
        // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }); // 팔로우 중인 사람을 찾으려면 팔로워를 먼저 찾고 거기에 연결된 사람을 검색해야함 - 그걸 foreignKey 로 구분함
        
    };

    return ProductImage;
}