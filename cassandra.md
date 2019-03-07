A/ Các bước cài đặt cassandra trên window:
1. Cài đặt python và java bản mới nhất
2. Set variable enviroment cho python và java (nếu cần)
3. Lên trang chủ http://www.apache.org tải bản mới nhất apache-cassandra về (dạng apache-cassandra-3.11.4.bin.tar.gz)
4. Giải nén vào ổ C hoặc bất cứ đâu
5. Thêm vào Path của System variables rồi thêm mới đường dẫn đến apache-cassandra vừa giải nén
6. Khởi chạy server cassandra: trong cmd: cassandra -f
7. Mở 1 cmd khác để thực hiện query, tạo bảng các thứ

B/ Key concepts, data structures and algorithms:
1. Data Partitioning(Phân vùng dữ liệu): Là cơ sở dũ liệu duy nhất, ko chia sẻ như mysql. Dữ liệu được chia đều ra các cụm nút, mỗi nút có trách nhiệm lưu trữ 1 phần dữ liệu nào đó. Hành động phân phối dữ liệu trên các nút gọi là "Phân vùng dữ liệu"
=> Tại sao cassandra lại nhanh? Vì nó thống nhất, tất cả dữ liệu được lưu trữ trong 1 database duy nhất cho 1 hệ thống. Mysql có thế chia sẻ: nghĩa là ở các công ty khác nhau có các database khác nhau hoàn toàn có thể lấy dữ liệu từ nhau. Việc chia sẻ làm query lâu hơn.

2. Consistent hashing(Băm nhất quán): Để phân phối dữ liệu tới các cụm nút thì cần giải quyết 2 vấn đề: 
- Xác định một nút mà trên đó 1 phần dữ liệu cụ thể sẽ nằm trên đó
- minimising data movement when adding or removing nodes(giảm thiếu chuyền động dữ liệu khi thêm hoặc loại bỏ các nút)
=> Băm nhất quán sẽ giải quyết 2 vấn đề này: Nó sẽ cho phép ánh xạ các row keys (như primary key trong sql) vào các nút vật lý. Phạm vi của các giá trị từ thuật toán là một không gian tròn cố định (như kiểu số h trên đồng hồ) được gọi là rings. minimises the key movements when nodes join or leave the cluster(giảm thiều các chuyển động chính khi nút tham gia hay rời khỏi cụm). Trung bình chỉ có k/n keys cần được ánh xạ lại với k là số key, n là số nút.

3. Data replication(Sao chép dữ liệu): Phân vùng dữ liệu trên hệ thống ko chia sẻ dẫn đến nếu một nút dữ liệu bị hỏng thì toàn bộ dữ liệu cũng bị hỏng. Điều này được giải quyết bằng cách tạo ra các replicas(bản sao). Sao chép dữ liệu đảm bảo khả năng chống chịu lỗi và độ tin cậy

4. Eventual consistency(Tính nhất quán cuối cùng): Vì dữ liệu được sao chép ra nhiều nút nên phải chú ý đến tính đồng bộ của toàn bộ bản sao chép. Tính nhất quán đảm bảo bất kì khi nào client yêu cầu dữ liệu thì dữ liệu trả về phải là dữ liệu cập nhật cuối cùng trên tất cả các nút.

5. Tunable consistency(Tính nhất quán thay đổi): Người dùng có thể xác định mức độ nhất quán bằng cách điều chỉnh nó thông qua các hoạt động đọc và ghi. Để nhất quán toàn bộ dữ liệu thì phải mất vài giây (lâu => nên cần thay đổi tùy vào mục đích).

6. Consistency level(Mức độ nhất quán): Cho phép người dùng định cấu hình số lượng bản sao trong một cụm (cluster) phải xác nhận thao tác đọc hoặc ghi trước khi đồng bộ (nhất quán) trên cả hệ thống. Mức độ nhất quán là tham số bắt buộc trong mọi thao tác đọc, ghi và xác định số lượng nút chính xác phải đồng bộ nhất quán trước khi đồng bộ cả hệ thống.

7. Data centrer, Racks, Nodes: 
- Data center (DC) là nơi tập trung nhiều máy tính và hệ thống mạng để  giúp đáp ứng nhu cầu công nghệ thông tin của một tổ chức. 

- Racks: 1 rack là 1 đơn vị chứa nhiều máy chủ được xếp chồng lên nhau. Cho phép các DC lưu trữ floor space (không gian sàn?????) và hợp nhất các tài nguyên được kết nối mạng.

- Nodes: 1 node là một server trong một rack. 

=> Cassandra được phát triển trong một môi trường DC nên data cần được replica 1 cách thông minh để tránh lỗi. Data phải được replica tới server ở một rack khác hiện tại để  đảm bảo không có lỗi. Có thể dễ dàng cấu hình hoạt động trong nhiều DC để  tránh lỗi và sự cố.

8. Snitches(Các cách để nhân bản dữ liệu) and Replication strategies(Chiến lược nhân rộng): 
- Snitches là giao thức để xác định độ gần nhau của các nút trong 1 ring
- Replication strategies sử dụng thông tin về khoảng cách mà Stitches cung cấp để xác định 1 cụm có cùng trạng thái (cùng bản sao)

9. Gossip protocol(Giao thức tin đồn ???): Giao thức trao đổi thông tin trạng thái giữa các nút trong một cụm. Một nút không giao tiếp với mọi nút để tránh nghẽn mạng, 1 nút chỉ giao tiếp tối đa với 3 nút khác và trong một chu kì trạng thái của các nút được truyền đi khắp cụm. 
=> Dùng để phát hiện lỗi
=> Tại sao ?

10. Bloom filters(Bộ lọc Bloom): Trành trùng lặp dữ liệu

11. Merkle tree: Tìm sự khác biệt giữa các nút => để cập nhập?(maybe)

12. SSTable(Sorted String Table): Lưu trữ các mảnh dữ liệu lớn trong một tệp

13. Write back cache(Ghi lại cache): Chưa thấy gì hay

14. Memtable: 1 memtable là một bộ đệm ghi lại nằm trong bộ nhớ chưa được xóa trong đĩa

15. Keyspace: Tương tự như schema trong mysql, để định nghĩa 1 keyspace phải chỉ ra Replication strategy và Replication factor như số lượng nút cần được nhân bản ra các nút khác.

16. Column family(Cụm cột): Như bảng trong mysql.
 - Sql: table(key, att1, att2): mảng 2 chiều gồm các cột và hàng, cột ứng với hàng là giá trị cuối cùng.
 - Cassandra: columnFamily(Row(column1, column2, ...), Row(column1, ...)): danh sách các hàng với mỗi hàng gồm nhiều cột, cột là nơi lưu giá trị cuối cùng, column(name, value, clock)

17. Row key: Khóa của một row chứa nhiều column, mỗi column được xác định qua row key và key của nó.

C/ Cassandra Cluster/Ring (Cụm/Vòng)
1. Cluster bootstrapping: Là hành động quản lí thông tin trạng thái các nút sử dụng Gossip protocol qua các nút chính.
 - Một cluster sẽ được đăng kí 1 tên. Tất cả các node trong cluster đó sẽ có cùng tên. 
 - Các nút chính sẽ khởi động cùng cluster để giao tiếp với các nút khác. 
 - Thống tin trạng thái của node chính thay đổi từng giây và chứa thông tin về nó và các node khác
=> cho phép các node biết thông tin về các node khác trong khi chỉ cần giao tiếp với 1 số node hữu hạn

2. Cassandra ring:
